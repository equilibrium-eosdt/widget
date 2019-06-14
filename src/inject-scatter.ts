import EOSClient from "./client";
import Login from "./scatter/login";
import { Client } from "./types";
import { Widget, WidgetDef } from "./widget";
import Equilibrium from "./";

const Scatter: WidgetDef<{}, {}> = {
  state: {},

  render: (_, r) => {
    return r`${{ id: "scatter", className: "scatter-auth", type: Login }}`;
  },
};

const client = new EOSClient("eosdt");
const context = Equilibrium.getContext();
const injector = Equilibrium.injectEOSClient.bind(null);

Equilibrium.injectEOSClient = (client: Client) => {
  injector(client);
  window.dispatchEvent(new Event("equilibrium:ready"));
};

Equilibrium.Widgets.Scatter = (el: HTMLElement) => {
  if (!el) {
    return null;
  }

  return new Widget<{}, {}>(el, Scatter, context);
};

(<any>window).Equilibrium = Equilibrium;
window.dispatchEvent(new Event("equilibrium:loaded"));
Equilibrium.injectEOSClient(<Client>client);
