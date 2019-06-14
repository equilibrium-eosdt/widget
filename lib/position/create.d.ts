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
}): WidgetDef<CreatePositionState, Context>;
