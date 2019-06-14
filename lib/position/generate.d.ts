import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Context, Contract } from "../types";
export interface GenerateState {
    form?: ReturnType<typeof Form>;
}
export default function GenerateEOSDT(deps: {
    account: Account;
    contract: Contract;
}): WidgetDef<GenerateState, Context>;
