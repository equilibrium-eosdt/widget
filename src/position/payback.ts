import { t } from "../globals";
import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Context, Contract } from "../types";

export interface PaybackState {
  form?: ReturnType<typeof Form>;
}

export default function PaybackEOSDT(deps: {
  account: Account;
  contract: Contract;
  getNUTAmount: (value: string) => number;
  getUserBalanceEosdt?: () => number;
  getUserBalanceNut?: () => number;
  availableToPayback?: () => number | undefined;
}) {
  const {
    account,
    contract,
    getUserBalanceEosdt,
    getUserBalanceNut,
    getNUTAmount,
    availableToPayback,
  } = deps;

  return <WidgetDef<PaybackState, Context>>{
    state: {},

    onInit: async (w) => {
      w.update({
        form: Form({
          id: "payback-eosdt",
          className:
            "equil-position-manage__form equil-position-manage__form--tab",
          fields: ["amount"],
          validate: {
            amount: (value: string) => {
              let error;
              const nutAmount = getNUTAmount(value);

              const userBalanceEosdt = getUserBalanceEosdt
                ? getUserBalanceEosdt()
                : 0;
              const userBalanceNut = getUserBalanceNut
                ? getUserBalanceNut()
                : 0;

              const availableAmount = availableToPayback
                ? availableToPayback()
                : 0;

              const paybackFee = (Math.ceil(nutAmount * 10000) / 10000).toFixed(
                4,
              );

              if (Number(value) > Number(100000000)) {
                error = t`Payback amount cannot exceed 100000000.`;
              } else if (Number(availableAmount) <= 0 && Number(value) > 0) {
                error = t`There's nothing to payback`;
              } else if (userBalanceNut < Number(paybackFee)) {
                error = t`Your NUT balance is less than ${paybackFee}`;
              } else if (nutAmount > userBalanceEosdt) {
                const max = userBalanceEosdt ? userBalanceEosdt.toFixed(4) : 0;
                error = t`You can't payback more than ${max}`;
              }

              w.ctx.events.emit("eosdt:update", error ? 0 : -Number(value));
              return error;
            },
          },
          handler: async (data?: FormData) => {
            if (data) {
              const positions = await contract.getAllUserPositions(
                account.name,
              );
              const amount = Number(data.get("amount"));

              if (!positions.length) {
                throw new Error("No position found");
              }

              if (Number.isFinite(amount) && amount > 0) {
                await contract.burnbackDebt(
                  account.name,
                  amount,
                  positions[0].position_id,
                );

                w.ctx.events.emit("transaction");
              } else {
                throw new Error(t`Wrong data`);
              }
            } else {
              throw new Error(t`No data`);
            }
          },
        }),
      });
    },

    render: (state, r) => {
      return r`${state.form}`;
    },
  };
}
