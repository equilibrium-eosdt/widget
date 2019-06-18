import { JsonRpc } from "eosjs";
import { EventEmitter } from "events";
import { t, setLocale } from "./globals";
import ManagePosition from "./position";
import { Context, EquilibriumInjector, Client } from "./types";
import { LoginState } from "./scatter/login";
import { setStyles, setContainerStyle } from "./styles";
import { Widget, WidgetDef } from "./widget";

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
      throw new Error(t`Missing EOS client`);
    }

    if (client.getAccount()) {
      w.update({ loggedIn: true });
    }
  },

  render: (state, r) => {
    return r`${state.loggedIn && {
      id: "position",
      className: "equil-position-manage",
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

  setContainerStyle(el);
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
        name: accountName,
      }),
      rpc: new JsonRpc(endpoint),
      api: {
        transact: async (txObj: any, options: any) =>
          await onTransaction(txObj, options),
      },
    });
  },

  setLocale,

  injectEOSClient: (client: Client) => {
    context.client = client;
  },

  getContext: () => context,

  Widgets: {
    Position: injectPositionWidget,
  },
};

export default Equilibrium;

export { setStyles };
