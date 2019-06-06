import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Contract } from "../types";

export interface GenerateState {
  form: ReturnType<typeof Form>;
}

export default function GenerateEOSDT(deps: {
  account: Account;
  contract: Contract;
}) {
  const { account, contract } = deps;

  return <WidgetDef<GenerateState, {}>>{
    state: {
      form: Form({
        id: "generate-eosdt",
        className: "form",
        fields: ["amount"],
        handler: async (data?: FormData) => {
          if (data) {
            const positions = await contract.getAllUserPositions(account.name);
            const amount = Number(data.get("deposit"));

            if (!positions.length) {
              throw new Error("No position found");
            }

            if (Number.isFinite(amount) && amount > 0) {
              await contract.generateDebt(
                account.name,
                amount,
                positions[0].position_id,
              );
            } else {
              throw new Error("Wrong data");
            }
          } else {
            throw new Error("No data");
          }
        },
      }),
    },

    onInit: async () => {
      console.log(account, contract);
    },

    render: (state, r) => {
      return r`${state.form}`;
    },
  };
}
