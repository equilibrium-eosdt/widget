import { Tabs } from "../ui";
import { WidgetDef } from "../widget";
import { Context, Contract, Position } from "../types";
export interface MPState {
    account?: {
        name: string;
        authority?: string;
        publicKey?: string;
        blockchain?: string;
        chainId?: string;
    };
    contract?: Contract;
    positions?: Position[];
    tabs?: ReturnType<typeof Tabs>;
    rates?: any;
    params?: any;
    settings?: any;
    balance?: string[];
}
declare const ManagePosition: WidgetDef<MPState, Context>;
export default ManagePosition;
