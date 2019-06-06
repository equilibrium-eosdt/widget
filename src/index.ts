import { JsonRpc } from "eosjs";
import { EventEmitter } from "events";
import ManagePosition from "./position";
import { Context, EquilibriumInjector, Client } from "./types";
import { Widget, WidgetDef } from "./widget";
import { LoginState } from "./scatter/login";

interface State {
  loggedIn: boolean;
}

const CreatePosition: WidgetDef<State, Context> = {
  state: {
    loggedIn: false,
  },

  onInit: async (w) => {
    const { events, client } = w.ctx;

    events.on("account", (state: LoginState) => {
      const { loggedIn } = state;
      w.update({ loggedIn });
    });

    if (!client) {
      throw new Error("Missing EOS client");
    }

    if (client.getAccount()) {
      w.update({ loggedIn: true });
    }
  },

  render: (state, r) => {
    return r`${state.loggedIn && {
      id: "position",
      className: "position-manage",
      type: ManagePosition,
    }}`;
  },
};

const context: Context = {
  events: new EventEmitter(),
};

const injectPositionWidget = (el: HTMLElement) => {
  if (!el) {
    return null;
  }

  return new Widget<State, Context>(el, CreatePosition, context);
};

const Equilibrium: EquilibriumInjector = {
  isReady: () => !!context.client,
  init: (
    accountName: string,
    endpoint: string,
    onTransaction: (txObj: any, options: any) => Promise<void>,
  ) => {
    Equilibrium.injectEOSClient(<any>{
      getAccount: () => ({
        name: accountName
      }),
      rpc: new JsonRpc(endpoint),
      api: {
        transact: async (txObj: any, options: any) =>
          await onTransaction(txObj, options),
      },
    });
  },
  injectEOSClient: (client: Client) => {
    context.client = client;
    window.dispatchEvent(new Event("equilibrium:ready"));
  },
  getContext: () => context,
  Widgets: {
    Position: injectPositionWidget,
  },
};

(<any>window).Equilibrium = Equilibrium;
window.dispatchEvent(new Event("equilibrium:loaded"));
