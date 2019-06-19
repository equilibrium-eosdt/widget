import { EventEmitter } from "events";
import { Api, JsonRpc } from "eosjs";
import { PositionsContract } from "@eosdt/eosdt-js/dist/positions";
import { Widget } from "./widget";

export interface Account {
  name: string;
  authority?: string;
  publicKey?: string;
  blockchain?: string;
  chainId?: string;
}

type TxObj = any;
type TxOpt = any;

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
  iframeMode: boolean;
  isReady: () => boolean;
  init: (
    accountName: string,
    endpoint: string,
    onTransaction: (txObj: TxObj, options: TxOpt) => Promise<void>,
  ) => void;
  injectEOSClient: (client: Client) => void;
  setLocale: (locale: { [key: string]: string[] }) => void;
  getContext: () => Context;
  Widgets: {
    Position: (el: HTMLElement) => Widget<any, any> | null;
    Scatter?: (el: HTMLElement) => Widget<any, any> | null;
  };
}
