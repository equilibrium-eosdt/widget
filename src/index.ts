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

    /* const balance = await client!.rpc.get_currency_balance(
      "eosio.token",
      `${account.name}`,
      "EOS",
    ); */

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

const iframeOptions = {
  accountName: "",
  endpoint: "",
};

const context: Context = {
  events: new EventEmitter(),
};

const Equilibrium: EquilibriumInjector = {
  iframeMode: false,
  isReady: () => !!context.client,
  init,
  setLocale,

  injectEOSClient: (client: Client) => {
    context.client = client;
  },

  getContext: () => context,

  Widgets: {
    Position: injectPositionWidget,
  },
};

function injectPositionWidget(el: HTMLElement) {
  if (!el) {
    return null;
  }

  if (Equilibrium.iframeMode) {
    el.innerHTML = `<iframe src="https://cdn.eosdt.com/widget/iframe.html#${
      iframeOptions.accountName
    }@${iframeOptions.endpoint}"></iframe>`;
    return null;
  } else {
    setContainerStyle(el);
    return new Widget<State, Context>(el, CreatePosition, context);
  }
}

function init(
  accountName: string,
  endpoint: string,
  onTransaction: (txObj: any, options: any) => Promise<void>,
) {
  if (Equilibrium.iframeMode) {
    iframeOptions.accountName = accountName;
    iframeOptions.endpoint = endpoint;

    window.addEventListener("message", async (e: Event) => {
      if ((<any>e).data) {
        try {
          const data = JSON.parse((<any>e).data);
          const { tx, opt } = data;

          if (tx) {
            await onTransaction(tx, opt);
          }
        } catch (err) {
          // do nothing for now
        }
      }
    });
  } else {
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
  }
}
export default Equilibrium;

export { setStyles };
