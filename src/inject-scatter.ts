import EOSClient from "./client";
import Login from "./scatter/login";
import { Client, EquilibriumInjector } from "./types";
import { Widget, WidgetDef } from "./widget";
import "./";

const Scatter: WidgetDef<{}, {}> = {
  state: {},

  render: (_, r) => {
    return r`${{ id: "scatter", className: "scatter-auth", type: Login }}`;
  },
};

const client = new EOSClient("eosdt");
const context = (<EquilibriumInjector>(<any>window).Equilibrium).getContext();

(<EquilibriumInjector>(<any>window).Equilibrium).Widgets.Scatter = (
  el: HTMLElement,
) => {
  if (!el) {
    return null;
  }

  return new Widget<{}, {}>(el, Scatter, context);
};

(<EquilibriumInjector>(<any>window).Equilibrium).injectEOSClient(
  <Client>client,
);
