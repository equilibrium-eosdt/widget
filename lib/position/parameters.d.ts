import { Context } from "../types";
import { WidgetDef } from "../widget";
interface Deps {
    getLtv: (eos: number, eosdt: number) => number;
    getMinRate: (eos: number, eosdt: number) => number;
    getMaxEos: (eos: number, eosdt: number) => number;
    getMaxEosdt: (eos: number, eosdt: number) => number;
}
export interface ParamState {
    eos: number;
    eosdt: number;
}
export default function Parameters(deps: Deps): WidgetDef<ParamState, Context>;
export {};
