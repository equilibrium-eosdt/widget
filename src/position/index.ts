import { EosdtConnectorInterface } from "@eosdt/eosdt-js/dist/interfaces/connector";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { t } from "../globals";
import { Tabs } from "../ui";
import { WidgetDef } from "../widget";
import { Account, Context, Contract, Position } from "../types";
import CreatePosition from "./create";
import DepositEOS from "./deposit";
import WithdrawEOS from "./withdraw";
import GenerateEOSDT from "./generate";
import PaybackEOSDT from "./payback";

export interface MPState {
  account?: {
    name: string;
    authority?: string;
    publicKey?: string;
    blockchain?: string;
    chainId?: string;
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

  eosdt?: number;
  getNUTAmount?: (value: string) => number;
}

const ManagePosition: WidgetDef<MPState, Context> = {
  state: {},

  onInit: async (w) => {
    const {
      ctx: { client, events },
    } = w;
    const rawAccount = client!.getAccount();

    if (!rawAccount) {
      throw new Error(t`No account`);
    }

    const account = <Account>rawAccount;

    const contract = new PositionsContract(<EosdtConnectorInterface>(
      (<any>client)
    ));

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

    const getNutBalance = await client!.rpc.get_currency_balance(
      "eosdtnutoken",
      `${account.name}`,
      "NUT",
    );

    const userBalanceNut = getNutBalance.length
      ? parseFloat(getNutBalance[0])
      : 0;

    const getEosdtBalance = await client!.rpc.get_currency_balance(
      "eosdtsttoken",
      `${account.name}`,
      "EOSDT",
    );

    const userBalanceEosdt = getEosdtBalance.length
      ? parseFloat(getEosdtBalance[0])
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

      let nutAmount = (value * (governance - outstanding)) / outstanding;

      if (outstanding_delta > Number(positions[0].outstanding)) {
        nutAmount = governance - outstanding;
      }

      nutAmount = nutAmount / (Number(EosRate) / Number(NutRate));

      return nutAmount;
    };

    const tabs = Tabs({
      id: "tabs",
      className: "equil-position-manage__tab-container",
      tabs: [
        {
          id: "deposit",
          name: () => t`Deposit`,
          type: DepositEOS({
            account,
            contract,
            maxToDepositFunc: () => w.state.userBalanceEos,
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
            userBalanceNut: userBalanceNut,
            userBalanceEosdt: userBalanceEosdt,
            availableToPayback: () => w.state.eosdt,
          }),
        },
      ],
    });

    w.update({
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
    });

    events.on("position:created", async () => {
      const positions = await contract.getAllUserPositions(name);
      const rates = await contract.getRates();
      w.update({ positions, rates });
    });

    events.on("transaction", async () => {
      const positions = await contract.getAllUserPositions(name);
      const rates = await contract.getRates();
      w.update({ positions, rates });
    });
  },

  onUpdate: async (w) => {
    const state = w.state;
    const { params, rates, settings, balance } = state;

    const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);
    if (!rate) {
      throw new Error(t`No USD rate`);
    }
    const { stability_rate } = params;
    const { outstanding, collateral } = state.positions![0];
    const k = balance
      ? parseFloat(balance[0]) / parseFloat(params.total_collateral)
      : 0;
    const eos = parseFloat(collateral) * k;
    const eosdt = parseFloat(outstanding) * parseFloat(stability_rate);
    const usd = eos * parseFloat(rate.rate);
    const minLtv = parseFloat(settings.critical_ltv);
    const maxEos = (usd - eosdt * minLtv) / parseFloat(rate.rate);
    const maxEosdt = (usd - minLtv * eosdt) / minLtv;
    if (maxEos !== w.state.maxEos || maxEosdt !== w.state.maxEosdt) {
      w.update({ maxEos, maxEosdt });
    }
    if (eosdt !== w.state.eosdt) {
      w.update({ eosdt });
    }
  },

  render: (state, r) => {
    const {
      params,
      account,
      positions,
      contract,
      rates,
      settings,
      balance,
    } = state;

    if (!account) {
      return t`Waiting for account...`;
    }

    if (!contract) {
      return t`Waiting for contract...`;
    }

    if (!params) {
      return t`Waiting for params...`;
    }

    if (!rates) {
      return t`Waiting for rates...`;
    }

    if (!balance || !balance[0]) {
      return t`Waiting for contract balance...`;
    }

    if (!Array.isArray(positions) || positions.length < 1) {
      return r`
      <div class="equil-position-actions">
        <h2 class="equil-position-manage__title">${t`Create position`}</h2>${{
        id: "create-position",
        type: CreatePosition({ account, contract }),
      }}
      </div>
      <div class="equil-position-parameters equil-position-parameters--empty">
        <h2 class="equil-position-manage__title">${t`You don't have any positions yet`}</h2>
          <span class="equil-position-parameters__title">${t`Deposit collateral and generate <br/>debt to get started`}</span>
      </div>`;
    }

    const rate = rates.find((rate: any) => rate.rate.indexOf("USD") >= 0);
    if (!rate) {
      throw new Error(t`No USD rate`);
    }

    const { stability_rate } = params;
    const { outstanding, collateral } = state.positions![0];
    const k = parseFloat(balance[0]) / parseFloat(params.total_collateral);
    const eos = parseFloat(collateral) * k;
    const eosdt = parseFloat(outstanding) * parseFloat(stability_rate);
    const usd = eos * parseFloat(rate.rate);
    const minLtv = parseFloat(settings.critical_ltv);
    const ltv = usd / eosdt;
    const minRate = (minLtv * eosdt) / eos;
    const maxEos = (usd - eosdt * minLtv) / parseFloat(rate.rate);
    const maxEosdt = (usd - minLtv * eosdt) / minLtv;

    return r`
      <div class="equil-position-actions">
        <h2 class="equil-position-manage__title">
          ${t`Manage position of <i class="equil-position-manage__username">${
            account.name
          }</i>`}
        </h2>
        <div class="equil-position-actions__labels">
          <div class="equil-position-actions__label">
            <span>${t`Collateral EOS`}</span>
            <span class="equil-position-actions__value">${eos.toFixed(4)}</span>
          </div>
          <div class="equil-position-actions__label">
            <span>${t`Debt EOSDT`}</span>
            <span class="equil-position-actions__value">${eosdt.toFixed(
              2,
            )}</span>
          </div>
        </div>
        ${state.tabs}
      </div>
      <div class="equil-position-parameters">
        <h2 class="equil-position-manage__title">${t`Position parameters`}</h2>
        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">${t`Collateralization ratio:`}</span>
          <span class="equil-position-parameters__value">${(
            ltv * 100
          ).toFixed()}%</span>
        </div>
        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">${t`Liquidation price:`}</span>
          <span class="equil-position-parameters__value">${minRate.toFixed(
            2,
          )}$</span>
        </div>
        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">${t`Max EOS to withdraw:`}</span>
          <span class="equil-position-parameters__value">${maxEos.toFixed(
            4,
          )} EOS</span>
        </div>
        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">${t`Max EOSDT to generate:`}</span>
          <span class="equil-position-parameters__value">${maxEosdt.toFixed(
            2,
          )} EOSDT</span>
        </div>
      </div>
`;
  },
};

export default ManagePosition;
