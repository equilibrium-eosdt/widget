import { t } from "../globals";
import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Context, Contract } from "../types";

export interface DepositState {
  form?: ReturnType<typeof Form>;
}

export default function DepositEOS(deps: {
  account: Account;
  contract: Contract;
  maxToDepositFunc?: () => number | undefined;
}) {
  const { account, contract, maxToDepositFunc } = deps;

  return <WidgetDef<DepositState, Context>>{
    state: {},

    onInit: async (w) => {
      w.update({
        form: Form({
          id: "deposit-eos",
          className:
            "equil-position-manage__form equil-position-manage__form--tab",
          fields: ["amount"],
          validate: {
            amount: (value: string) => {
              let error;
              const maxToDeposit = maxToDepositFunc ? maxToDepositFunc() : 0;

              if (Number(value) > 100000000) {
                error = t`Deposit amount cannot exceed 100000000.`;
              } else if (Number(value) > Number(maxToDeposit)) {
                const max = maxToDeposit ? Number(maxToDeposit).toFixed(4) : 0;
                error = t`Value should not exceed your balance of ${max} EOS`;
              }

              w.ctx.events.emit('eos:update', error ? 0 : Number(value));
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
                throw new Error(t`No position found`);
              }

              if (Number.isFinite(amount) && amount > 0) {
                await contract.addCollateral(
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
