import { EventEmitter } from "events";
import { Api, JsonRpc } from "eosjs";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { Widget } from "./widget";

export interface Account {
  name: string;
  authority: string;
  publicKey: string;
  blockchain: string;
  chainId: string;
}

export { PositionsContract as Contract };

export interface Position {
  position_id: number;
  maker: string;
  outstanding: string;
  governance: string;
  collateral: string;
}

export interface Client {
  api: Api;
  rpc: JsonRpc;
  getAccount: () => Account | boolean;
}

export interface Context {
  client?: Client;
  events: EventEmitter;
}

export interface EquilibriumInjector {
  isReady: () => boolean;
  injectEOSClient: (client: Client) => void;
  getContext: () => Context;
  Widgets: {
    Position: (el: HTMLElement) => Widget<any, any> | null;
    Scatter?: (el: HTMLElement) => Widget<any, any> | null;
  };
}
