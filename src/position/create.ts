import { t } from "../globals";
import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Contract } from "../types";
import { Context } from "../types";

export interface CreatePositionState {
  form?: ReturnType<typeof Form>;
}

export default function CreatePosition(deps: {
  account: Account;
  contract: Contract;
}) {
  const { account, contract } = deps;

  return <WidgetDef<CreatePositionState, Context>>{
    state: {},

    onInit: async (w) => {
      const { events } = w.ctx;

      w.update({
        form: Form({
          id: "create-position",
          className: "form",
          fields: ["deposit", "generate"],
          label: ["I want to deposit EOS", "And generate EOSDT"],
          // buttonText: "Create position",
          handler: async (data?: FormData) => {
            if (data) {
              const [deposit, generate] = [
                Number(data.get("deposit")),
                Number(data.get("generate")),
              ];

              if (
                Number.isFinite(deposit) &&
                deposit > 0 &&
                Number.isFinite(generate) &&
                generate > 0
              ) {
                await contract.create(account.name, deposit, generate);
                events.emit("position:created");
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
