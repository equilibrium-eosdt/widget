import { Context } from "../types";
import { WidgetDef } from "../widget";
interface Deps {
    getRates: () => any;
}
interface BalanceState {
    rates?: number;
}
export default function Rates(deps: Deps): WidgetDef<BalanceState, Context>;
export {};
