import { EosdtConnectorInterface } from "@eosdt/eosdt-js/dist/interfaces/connector";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { t } from "../globals";
import { Tabs } from "../ui";
import { WidgetDef } from "../widget";
import { Account, Context, Contract, Position } from "../types";
import CreatePosition from "./create";
import Parameters from "./parameters";
import DepositEOS from "./deposit";
import WithdrawEOS from "./withdraw";
import GenerateEOSDT from "./generate";
import PaybackEOSDT from "./payback";
import Balances from "./balances";
import Rates from "./rates";

export interface MPState {
  account?: {
    name: string;
    authority?: string;
    publicKey?: string;
    blockchain?: string;
    chainId?: string;
  };

  createPosition?: {
    id: string;
    type: ReturnType<typeof CreatePosition>;
  };

  parameters?: {
    id: string;
    type: ReturnType<typeof Parameters>;
  };

  userBalances?: {
    id: string;
    type: ReturnType<typeof Balances>;
  };

  currencyRates?: {
    id: string;
    type: ReturnType<typeof Rates>;
  };

  contract?: Contract;
  positions?: Position[];
  tabs?: ReturnType<typeof Tabs>;
  rates?: any;
  params?: any;
  settings?: any;
  balance?: string[];

  maxEos?: number;
  maxEosdt?: number;
  userBalanceEos?: number;
  userBalanceEosdt?: number;
  userBalanceNut?: number;

  minLtv: number;
  ltv?: number;
  eos: number;
  minRate?: number;
  eosdt: number;
  getNUTAmount?: (value: string) => number;
}

const ManagePosition: WidgetDef<MPState, Context> = {
  state: {
    eos: 0,
    eosdt: 0,
    minLtv: 1.7,
  },

  onInit: async (w) => {
    const {
      ctx: { client, events },
    } = w;
    const rawAccount = client!.getAccount();

    if (!rawAccount) {
      throw new Error(t`No account`);
    }

    const account = <Account>rawAccount;

    const contract = new PositionsContract(
      <EosdtConnectorInterface>(<any>client),
    );

    const { name } = <Account>account;
    const params = await contract.getParameters();
    const positions = await contract.getAllUserPositions(name);
    const rates = await contract.getRates();
    const settings = await contract.getSettings();

    const balance = await client!.rpc.get_currency_balance(
      "eosio.token",
      "eosdtcntract",
      "EOS",
    );

    const userBalanceArray = await client!.rpc.get_currency_balance(
      "eosio.token",
      `${account.name}`,
      "EOS",
    );
    const userBalanceEos = userBalanceArray
      ? parseFloat(userBalanceArray[0])
      : 0;

    const EosRate = rates ? parseFloat(rates[0].rate) : 0;
    const NutRate = rates ? parseFloat(rates[1].rate) : 0;

    const nutBalance = await client!.rpc.get_currency_balance(
      "eosdtnutoken",
      `${account.name}`,
      "NUT",
    );

    const userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;

    const eosdtBalance = await client!.rpc.get_currency_balance(
      "eosdtsttoken",
      `${account.name}`,
      "EOSDT",
    );

    const userBalanceEosdt = eosdtBalance.length
      ? parseFloat(eosdtBalance[0])
      : 0;

    const getNUTAmount = (value: any) => {
      if (!positions || !params) {
        return 0;
      }

      const governance =
        parseFloat(positions[0].governance) * Number(params.governance_rate);

      const outstanding =
        parseFloat(positions[0].outstanding) * Number(params.stability_rate);

      const outstanding_delta = outstanding / Number(params.stability_rate);

      let nutAmount = value * (governance - outstanding) / outstanding;

      if (outstanding_delta > Number(positions[0].outstanding)) {
        nutAmount = governance - outstanding;
      }

      nutAmount = nutAmount / (Number(EosRate) / Number(NutRate));

      return nutAmount;
    };

    const createPosition = {
      id: "create-position",
      type: CreatePosition({ account, contract }),
    };

    const parameters = {
      id: "parameters",
      className: "equil-position-parameters",
      type: Parameters({
        getLtv: (dEos: number, dEosdt: number) => {
          const eos = dEos + w.state.eos;
          const eosdt = dEosdt + w.state.eosdt;
          const { rates } = w.state;
          const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);

          if (!rate || !eosdt) {
            return 0;
          }

          const usd = eos * parseFloat(rate.rate);
          return eosdt !== 0 ? usd / eosdt : 0;
        },

        getMinRate: (dEos: number, dEosdt: number) => {
          const eos = dEos + w.state.eos;
          const eosdt = dEosdt + w.state.eosdt;
          return w.state.minLtv * eosdt / eos;
        },

        getMaxEos: (dEos: number, dEosdt: number) => {
          const eos = dEos + w.state.eos;
          const eosdt = dEosdt + w.state.eosdt;
          const { rates, minLtv } = w.state;
          const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);

          if (!rate || !eosdt) {
            return 0;
          }

          const usd = eos * parseFloat(rate.rate);
          return (usd - eosdt * minLtv) / parseFloat(rate.rate);
        },

        getMaxEosdt: (dEos: number, dEosdt: number) => {
          const eos = dEos + w.state.eos;
          const eosdt = dEosdt + w.state.eosdt;
          const { rates, minLtv } = w.state;
          const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);

          if (!rate || !eosdt) {
            return 0;
          }

          const usd = eos * parseFloat(rate.rate);
          return (usd - minLtv * eosdt) / minLtv;
        },
      }),
    };

    const userBalances = {
      id: "balances",
      className: "equil-user-balances",
      type: Balances({
        getUserBalanceEos: () => w.state.userBalanceEos || 0,
        getUserBalanceEosdt: () => w.state.userBalanceEosdt || 0,
        getUserBalanceNut: () => w.state.userBalanceNut || 0,
        getRates: () => w.state.rates,
      }),
    };

    const currencyRates = {
      id: "rates",
      className: "equil-rates",
      type: Rates({
        getRates: () => w.state.rates,
      }),
    };

    const tabs = Tabs({
      id: "tabs",
      className: "equil-position-manage__tab-container",

      onSelect: async () => {
        w.ctx.events.emit("eos:update", 0);
      },

      tabs: [
        {
          id: "deposit",
          name: () => t`Pledge`,
          type: DepositEOS({
            account,
            contract,
            maxToDepositFunc: () => w.state.userBalanceEos,
          }),
        },
        {
          id: "generate",
          name: () => t`Generate`,
          type: GenerateEOSDT({
            account,
            contract,
            maxToGenerateFunc: () => w.state.maxEosdt,
          }),
        },
        {
          id: "payback",
          name: () => t`Payback`,
          type: PaybackEOSDT({
            account,
            contract,
            getNUTAmount: getNUTAmount,
            getUserBalanceEosdt: () => w.state.userBalanceEosdt || 0,
            getUserBalanceNut: () => w.state.userBalanceNut || 0,
            availableToPayback: () => w.state.eosdt,
          }),
        },
        {
          id: "withdraw",
          name: () => t`Withdraw`,
          type: WithdrawEOS({
            account,
            contract,
            maxToWithdrawFunc: () => {
              return w.state.maxEos;
            },
          }),
        },
      ],
    });

    w.update({
      createPosition,
      parameters,
      account,
      positions,
      contract,
      tabs,
      params,
      rates,
      settings,
      balance,
      userBalanceEos,
      userBalanceNut,
      userBalanceEosdt,
      getNUTAmount,
      userBalances,
      currencyRates,
    });

    events.on("position:created", async () => {
      const positions = await contract.getAllUserPositions(name);
      const rates = await contract.getRates();
      const params = await contract.getParameters();

      const userBalanceArray = await client!.rpc.get_currency_balance(
        "eosio.token",
        `${account.name}`,
        "EOS",
      );
      const userBalanceEos = userBalanceArray
        ? parseFloat(userBalanceArray[0])
        : 0;

      const nutBalance = await client!.rpc.get_currency_balance(
        "eosdtnutoken",
        `${account.name}`,
        "NUT",
      );
      const userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;

      const eosdtBalance = await client!.rpc.get_currency_balance(
        "eosdtsttoken",
        `${account.name}`,
        "EOSDT",
      );
      const userBalanceEosdt = eosdtBalance.length
        ? parseFloat(eosdtBalance[0])
        : 0;

      w.update({
        positions,
        rates,
        userBalanceEos,
        userBalanceNut,
        userBalanceEosdt,
        params,
      });
    });

    events.on("transaction", async () => {
      const positions = await contract.getAllUserPositions(name);
      const rates = await contract.getRates();
      const params = await contract.getParameters();

      const userBalanceArray = await client!.rpc.get_currency_balance(
        "eosio.token",
        `${account.name}`,
        "EOS",
      );
      const userBalanceEos = userBalanceArray
        ? parseFloat(userBalanceArray[0])
        : 0;

      const nutBalance = await client!.rpc.get_currency_balance(
        "eosdtnutoken",
        `${account.name}`,
        "NUT",
      );
      const userBalanceNut = nutBalance.length ? parseFloat(nutBalance[0]) : 0;

      const eosdtBalance = await client!.rpc.get_currency_balance(
        "eosdtsttoken",
        `${account.name}`,
        "EOSDT",
      );
      const userBalanceEosdt = eosdtBalance.length
        ? parseFloat(eosdtBalance[0])
        : 0;

      w.update({
        positions,
        rates,
        userBalanceEos,
        userBalanceNut,
        userBalanceEosdt,
        params,
      });
    });
  },

  onUpdate: async (w) => {
    const state = w.state;
    const { params, rates, settings, balance, positions } = state;

    const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);

    if (!rate) {
      return;
    }

    const { stability_rate, eos_staked } = params;

    if (!positions![0]) {
      return;
    }

    const { outstanding, collateral } = positions![0];

    const k = balance
      ? parseFloat(balance[0] + parseFloat(eos_staked)) / parseFloat(params.total_collateral)
      : 0;

    const eos = parseFloat(collateral) * k;
    const eosdt = parseFloat(outstanding) * parseFloat(stability_rate);
    const usd = eos * parseFloat(rate.rate);
    const minLtv = parseFloat(settings.critical_ltv);
    const ltv = eosdt !== 0 ? usd / eosdt : 0;
    const minRate = minLtv * eosdt / eos;
    const maxEos = (usd - eosdt * minLtv) / parseFloat(rate.rate);
    const maxEosdt = (usd - minLtv * eosdt) / minLtv;

    if (
      ltv !== w.state.ltv ||
      minRate !== w.state.minRate ||
      maxEos !== w.state.maxEos ||
      maxEosdt !== w.state.maxEosdt ||
      eosdt !== w.state.eosdt ||
      eos !== w.state.eos ||
      minLtv !== w.state.minLtv
    ) {
      w.update({ ltv, minRate, maxEos, maxEosdt, eosdt, eos, minLtv });
    }
  },

  render: (state, r) => {
    const {
      params,
      account,
      positions,
      contract,
      rates,
      balance,
      eos,
      eosdt,
      createPosition,

      tabs,
    } = state;

    if (!account || !account.name) {
      return t`
      <div class="equil-position-manage__header">
        <a
          class="equil-position-manage__logo"
          href="https://eosdt.com/"
          target="_blank"
        >
          <img src="public/img/logo.svg" />
        </a>
        <a
          class="equil-position-manage__telegram"
          href="https://t.me/equilibrium_eosdt_official"
          target="_blank"
        >Join Telegram</a>
      </div>
      <div class="equil-position-manage__wrapper equil-position-manage__wrapper--loading">
        <div class="equil-position-actions">
          <h2 class="equil-position-manage__title">
            ${t`Create position`}
          </h2>
          <h2 class="equil-position-manage__parametersTitle">Waiting for account...</h2>
        </div>
      </div>
      <div class="equil-position-manage__balanceAndPrice">
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Balance`}
          </h2>
          <div class="equil-user-balances">
            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="public/img/EOS.svg" alt="EOS" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOS</span>
                  <span>0.00</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="public/img/EOSDT.svg" alt="EOSDT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>EOSDT</span>
                  <span>0.00</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>0.00</span>
                </div>
              </div>
            </div>

            <div class="equil-user-balances__item">
              <img class="equil-user-balances__img" src="public/img/NUT.svg" alt="NUT" />
              <div class="equil-user-balances__values">
                <div>
                  <span>NUT</span>
                  <span>0.00</span>
                </div>
                <div class="equil-user-balances__USDvalue">
                  <span>USD</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Price`}
          </h2>
          <div class="rates-5 equil-rates">
            <div class="equil-rates__item">
              <img class="equil-rates__img" src="public/img/EOS.svg" alt="EOS" />
              <div class="equil-rates__values">
                  <span>EOS</span>
                  <span>$0</span>
              </div>
            </div>
            <div class="equil-rates__item">
              <img class="equil-rates__img" src="public/img/NUT.svg" alt="NUT" />
              <div class="equil-rates__values">
                  <span>NUT</span>
                  <span>$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    }

    if (!contract) {
      return t`<h2 class="equil-position-manage__parametersTitle">Waiting for contract...</h2>`;
    }

    if (!params) {
      return t`<h2 class="equil-position-manage__parametersTitle">Waiting for params...</h2>`;
    }

    if (!rates) {
      return t`<h2 class="equil-position-manage__parametersTitle">Waiting for rates...</h2>`;
    }

    if (!balance || !balance[0]) {
      return t`Waiting for contract balance...`;
    }

    if (!Array.isArray(positions) || positions.length < 1) {
      if (createPosition) {
        return r`
          <div class="equil-position-manage__header">
            <a
              class="equil-position-manage__logo"
              href="https://eosdt.com/"
              target="_blank"
            >
              <img src="public/img/logo.svg" />
            </a>
            <a
              class="equil-position-manage__telegram"
              href="https://t.me/equilibrium_eosdt_official"
              target="_blank"
            >Join Telegram</a>
          </div>
          <div class="equil-position-manage__wrapper">
            <div class="equil-position-actions">
              <h2 class="equil-position-manage__title">
                ${t`Create position`}
              </h2>
              ${createPosition}
            </div>
            <div class="equil-position-parameters equil-position-parameters--empty">
              <h2 class="equil-position-manage__parametersTitle">${t`You don't have any positions yet`}</h2>
                <span class="equil-position-parameters__title">${t`Deposit collateral and generate <br/>EOSDT to get started`}</span>
            </div>
          </div>
          <div class="equil-position-manage__balanceAndPrice">
            <div class="equil-position-manage__wrapper">
              <h2 class="equil-position-manage__title">
                ${t`Balance`}
              </h2>
              ${state.userBalances}
            </div>
            <div class="equil-position-manage__wrapper">
              <h2 class="equil-position-manage__title">
                ${t`Price`}
              </h2>
              ${state.currencyRates}
            </div>
          </div>
      `;
      } else {
        return t`Loading...`;
      }
    }

    const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);

    if (!rate) {
      throw new Error(t`No USD rate`);
    }

    if (tabs) {
      return r`
      <div class="equil-position-manage__header">
        <a
          class="equil-position-manage__logo"
          href="https://eosdt.com/"
          target="_blank"
        >
          <img src="public/img/logo.svg" />
        </a>
        <a
          class="equil-position-manage__telegram"
          href="https://t.me/equilibrium_eosdt_official"
          target="_blank"
        >Join Telegram</a>
      </div>
      <div class="equil-position-manage__wrapper">
        <div class="equil-position-actions">
          <h2 class="equil-position-manage__title">
            ${t`Manage position of <i class="equil-position-manage__username">${
              account.name
            }</i>`}
          </h2>
          <div class="equil-position-actions__labels">
            <div class="equil-position-actions__label">
              <span>${t`EOS<br/>collateralized`}</span>
              <span class="equil-position-actions__value">${eos.toFixed(
                4,
              )}</span>
            </div>
            <div class="equil-position-actions__label">
              <span>${t`EOSDT<br/>generated`}</span>
              <span class="equil-position-actions__value">${eosdt.toFixed(
                2,
              )}</span>
            </div>
          </div>
          ${tabs}
        </div>
        ${state.parameters}
      </div>
      <div class="equil-position-manage__balanceAndPrice">
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Balance`}
          </h2>
          ${state.userBalances}
        </div>
        <div class="equil-position-manage__wrapper">
          <h2 class="equil-position-manage__title">
            ${t`Price`}
          </h2>
          ${state.currencyRates}
        </div>
`;
    } else {
      return t`Loading...`;
    }
  },
};

export default ManagePosition;
