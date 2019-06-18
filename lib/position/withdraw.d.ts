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
}): WidgetDef<WithdrawState, Context>;
