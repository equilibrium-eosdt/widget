import { t } from "../globals";
import { Context } from "../types";
import { WidgetDef } from "../widget";

interface Deps {
  getLtv: (eos: number, eosdt: number) => number;
  getMinRate: (eos: number, eosdt: number) => number;
  getMaxEos: (eos: number, eosdt: number) => number;
  getMaxEosdt: (eos: number, eosdt: number) => number;
}

export interface ParamState {
  eos: number;
  eosdt: number;
}

export default function Parameters(deps: Deps) {
  const { getLtv, getMinRate, getMaxEos, getMaxEosdt } = deps;

  return <WidgetDef<ParamState, Context>>{
    state: {
      eos: 0,
      eosdt: 0,
    },

    onInit: async (w) => {
      w.ctx.events.on("eos:update", (eos: number) =>
        w.update({ eos, eosdt: 0 }),
      );

      w.ctx.events.on("eosdt:update", (eosdt: number) =>
        w.update({ eosdt, eos: 0 }),
      );
    },

    render: (state, r) => {
      const { eos, eosdt } = state;
      console.log({ eos, eosdt });

      return r`
        <h2 class="equil-position-manage__parametersTitle">
        ${t`Position parameters`}
        </h2>

        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">
          ${t`Collateralization ratio:`}
          </span>
          <span class="equil-position-parameters__value">
          ${(getLtv(eos, eosdt) * 100).toFixed()}%
          </span>
        </div>

        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">
          ${t`Liquidation price of EOS:`}
          </span>
          <span class="equil-position-parameters__value">
          ${getMinRate(eos, eosdt).toFixed(2)}$
          </span>
        </div>

        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">
          ${t`Max EOS to withdraw:`}
          </span>
          <span class="equil-position-parameters__value">
          ${getMaxEos(eos, eosdt).toFixed(4)} EOS
          </span>
        </div>

        <div class="equil-position-parameters__item">
          <span class="equil-position-parameters__title">
          ${t`Max EOSDT to generate:`}
          </span>
          <span class="equil-position-parameters__value">
          ${getMaxEosdt(eos, eosdt).toFixed(2)} EOSDT
          </span>
        </div>`;
    },
  };
}
