import { WidgetDef } from "../widget";
import Form from "../ui/form";
import { Account, Context, Contract } from "../types";
export interface PaybackState {
    form?: ReturnType<typeof Form>;
}
export default function PaybackEOSDT(deps: {
    account: Account;
    contract: Contract;
    getNUTAmount: (value: string) => number;
    getUserBalanceEosdt?: () => number;
    getUserBalanceNut?: () => number;
    availableToPayback?: () => number | undefined;
}): WidgetDef<PaybackState, Context>;
