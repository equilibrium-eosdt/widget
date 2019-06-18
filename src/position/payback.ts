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
  userBalanceNut: number;
  userBalanceEosdt: number;
  availableToPayback?: () => number | undefined;
}) {
  const {
    account,
    contract,
    userBalanceEosdt,
    userBalanceNut,
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
              const nutAmount = getNUTAmount(value);
              const availableAmount = availableToPayback
                ? availableToPayback()
                : 0;
              const paybackFee = (Math.ceil(nutAmount * 10000) / 10000).toFixed(
                4,
              );
              if (Number(value) > Number(100000000)) {
                return t`Payback amount cannot exceed 100000000.`;
              } else if (Number(availableAmount) <= 0 && Number(value) > 0) {
                return t`There's nothing to payback`;
              } else if (userBalanceNut < Number(paybackFee)) {
                return t`Your NUT balance is less than ${paybackFee}`;
              } else if (nutAmount > userBalanceEosdt) {
                const max = userBalanceEosdt ? userBalanceEosdt.toFixed(4) : 0;
                return t`You can't payback more than ${max}`;
              } else return;
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
