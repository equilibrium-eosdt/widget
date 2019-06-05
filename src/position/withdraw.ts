import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Contract } from "../types";

export interface WithdrawState {
  form: ReturnType<typeof Form>;
}

export default function WithdrawEOS(deps: { account: Account, contract: Contract }) {
  const { account, contract } = deps;

  return <WidgetDef<WithdrawState, {}>>{
    state: {
      form: Form({
        id: "withdraw-eosdt",
        fields: ["amount"],
        handler: async (data?: FormData) => {
          if (data) {
            const positions = await contract.getAllUserPositions(account.name);
            const amount = Number(data.get("amount"));

            if (!positions.length) {
              throw new Error("No position found");
            }

            if (Number.isFinite(amount) && amount > 0) {
              await contract.deleteCollateral(
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
    render: (state, r) => r`${state.form}`
  };
}
