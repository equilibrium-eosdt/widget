import { t } from "../globals";
import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Context, Contract } from "../types";

export interface WithdrawState {
  form?: ReturnType<typeof Form>;
}

export default function WithdrawEOS(deps: {
  account: Account;
  contract: Contract;
  maxToWithdrawFunc?: () => number | undefined;
}) {
  const { account, contract, maxToWithdrawFunc } = deps;
  return <WidgetDef<WithdrawState, Context>>{
    state: {},

    onInit: async (w) => {
      w.update({
        form: Form({
          id: "withdraw-eosdt",
          className: "equil-position-manage__form equil-position-manage__form--tab",
          fields: ["amount"],
          validate: {
            amount: (value: string) => {
              const maxToWithdraw = maxToWithdrawFunc ? maxToWithdrawFunc() : 0;
              if (Number(value) > Number(maxToWithdraw)) {
                const max = maxToWithdraw
                  ? Number(maxToWithdraw).toFixed(4)
                  : 0;
                return t`EOS amount withdrawn should not be more than ${max}`;
              } else if (Number(value) > 100000000) {
                return t`Withdraw amount cannot exceed 100000000.`;
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
                throw new Error(t`No position found`);
              }

              if (Number.isFinite(amount) && amount > 0) {
                await contract.deleteCollateral(
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

    render: (state, r) => r`${state.form}`,
  };
}
