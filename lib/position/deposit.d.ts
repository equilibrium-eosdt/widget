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
}): WidgetDef<DepositState, Context>;
