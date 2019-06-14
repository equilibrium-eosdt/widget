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
}) {
  const { account, contract } = deps;

  return <WidgetDef<DepositState, Context>>{
    state: {},

    onInit: async (w) => {
      w.update({
        form: Form({
          id: "deposit-eos",
          className: "form form--tab",
          fields: ["amount"],
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
