import Equilibrium from "./";
import { Client } from "./types";

const injector = Equilibrium.injectEOSClient.bind(null);

Equilibrium.injectEOSClient = (client: Client) => {
  injector(client);
  window.dispatchEvent(new Event("equilibrium:ready"));
};

(<any>window).Equilibrium = Equilibrium;
window.dispatchEvent(new Event("equilibrium:loaded"));
