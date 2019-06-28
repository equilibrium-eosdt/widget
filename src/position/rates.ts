import { Context } from "../types";
import { WidgetDef } from "../widget";

interface Deps {
  getRates: () => any;
}

interface BalanceState {
  rates?: number;
}

export default function Rates(deps: Deps) {
  return <WidgetDef<BalanceState, Context>>{
    state: {},

    onInit: async (w) => {
      setInterval(() => w.update(), 60000);
    },

    render: (state, r) => {
      const { getRates } = deps;

      const rates = getRates && getRates();
      console.log(state);

      const balanceToNumber = (balance: string) => {
        if (balance === undefined) balance = "";
        const x = balance.match(/[0-9,\.]+/g);
        if (x === null) return 0;
        return Number(x[0]);
      };

      let eosUsdRate;
      let nutUsdRate;

      if (rates.length) {
        nutUsdRate = (balanceToNumber(rates[1].rate) * 100).toFixed(2);
        eosUsdRate = balanceToNumber(rates[0].rate).toFixed(2);
      }

      return r`
      <div class="equil-rates__item">
        <img class="equil-rates__img" src="public/img/EOS.svg" alt="EOS" />
        <div class="equil-rates__values">
            <span>EOS</span>
            <span>$${eosUsdRate || "0"}</span>
        </div>
      </div>

      <div class="equil-rates__item">
        <img class="equil-rates__img" src="public/img/NUT.svg" alt="NUT" />
        <div class="equil-rates__values">
            <span>NUT</span>
            <span>$${nutUsdRate || "0"}</span>
        </div>
      </div>
      `;
    },
  };
}
