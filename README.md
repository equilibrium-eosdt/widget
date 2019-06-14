
# Equilibrium Framework Widgets
## Getting started
### VIA npm
- Install `@eosdt/widgets` package
```bash
npm i @eosdt/widgets
```
- In your code:
```typescript
import Equilibrium from "@eosdt/widget";

/**
 * or you can inject into window object by
 * import "@eosdt/widget/lib/inject";
 * or
 * import "@eosdt/widget/lib/inject-scatter";
 */

Equilibrium.init('youracntname', 'http://eos.node.url:port', (tx, opts) => {
  // sign and send your transactions here
});

Equilibrium.Widgets.Position(
  /* target HTMLElement */ document.querySelector("#widget")
); // insert widget in any dom node

```
### VIA cdn
- Include _Equilibrium widget injector_ somewhere in your html, eg.
```html
<!doctype html>
<html>
...
<body>
...
<script async src="https://cdn.eosdt.com/widget/inject.js"></script>
<!-- 
  or you can use scatter injector
  <script async src="https://cdn.eosdt.com/widget/injectScatter.js"></script>
-->
</body>
</html>
```
- Initialization
```javascript
// When widget code is injected 'equilibrium:loaded' event is fired
if (!window.Equilibrium) {
	window.addEventListener('equilibrium:loaded', () => {
		// Here we can inject EOS client into our widget (or use injector with bundled connector)
		window.Equilibrium.injectEOSClient(client);
	})
} else {
	window.Equilibrium.injectEOSClient(client);
}
...
// When client is injected 'equilibrium:ready' event is fired
window.addEventListener('equilibrium:ready'), () => {
	window.Equilibrium.Widgets.Position(
		/* target HTMLElement */ document.querySelector("#widget")
	);
});
```
## Injectors
- inject.js - contains widget injectors without EOS blockchain client
- injectScatter.js - contains widget injectors with bundled connector to Scatter wallet
## API
### *window.Equilibrium* object
Interface
```typescript

interface Injector {
  isReady: () => boolean;
  init: (accountName: string, endpoint: string, onTransaction: (txObj: TxObj, options: TxOpt) => Promise<void>) => void;
  injectEOSClient: (client: Client) => void;
  setLocale: (locale: { [key: string]: string[] }) => void;
  getContext: () => Context;
  Widgets: {
    Position: (el: HTMLElement) => Widget | null;
    Scatter?: (el: HTMLElement) => Widget | null;
  };
}
```
- _isReady()_ - returns ready state of widgets(widgets are ready when the client is injected and initialized)
- _init(accountName: string, endpoint: string, onTransaction: (txObj, txOpt) => Promise<void>)_ - initialize widgets with dummy client, you need to specify your account name, EOS node endpoint and transaction signer
```typescript
window.addEventListener('equilibrium:ready'), () => {
	window.Equilibrium.Widgets.Position(
		/* target HTMLElement */ document.querySelector("#widget")
	);
});
  
window.Equilibrium.init('someeosaccnt', 'https://api.eosn.io:443', (txObj, txOpt) => {
  ...
  // here you can sign and sent your transactions
});
```
- _injectEOSClient(client: Client)_ - injects EOS Client and fires `equilibrium:ready` event, you can either have your own client implementation based on the interface below, or use bundle with built-in scatter connector
- _getContext()_ - returns widget context(interface is described below)
- _setLocale(locale)_ - sets locale messages for widget(__NB__ you may update widget instance to see changes)
```typescript
const widget = Equilibrium.Widgets.Position(...);

Equilibrium.setLocale({
  "Waiting for account": ["Wird geladen"],
  "Deposit": ["Deponieren"],
  "Withdraw": ["Zurückziehen"],
  "Generate": ["Generieren"],
  "Payback": ["Zurückzahlen"],
  "Total collateralized:": ["Total besichert:"],
  "Debt generated:": ["Schuld generiert:"],
  "Manage position of <i class=\"position-manage__username\">${...}</i>": [
    "Position verwalten von <i class=\"position-manage__username\">",
    "</i>"
  ],
  "Collateralization ratio:": ["Kollatarisierungsrate:"],
  "Liquidation price:": ["Liquidationspreis:"],
  "Max EOS to withdraw:": ["Max EOS zum zurückziehen:"],
  "Max EOSDT to generate:": ["Max EOSDT zum generieren:"],
  "OK": ["OK"],
  "Wrong data": ["Falshe Eingabe"]
});

widget.update({});
```
- _Widgets.Position(el: HTMLElement)_ - mount `Position` widget to DOM Node
- _Widgets.Scatter(el: HTMLElement)_ - mount `Scatter` login/logout widget to DOM Node. 
__NB.__ Only available on injector with Scatter connector
### Context
```typescript
import { EventEmitter } from "events";

interface Context {
  client?: Client;
  events: EventEmitter;
}
```
### Eos Client
Interface 
```typescript
import { JsonRPC, Api } from 'eosjs';

interface Account {
  name: string;
  authority: string;
  publicKey: string;
  blockchain: string;
  chainId: string;
}

export interface Client {
  api: Api;
  rpc: JsonRpc;
  getAccount: () => Account | false;
}
```
## Events
### Window events
Listen to events via *window.addEventListener(name, callback)*
- _'equilibrium:loaded'_ event is fired when window.Equilibrium becomes available
- _'equilibrium:ready'_ event is fired when EOS client is injected into widgets
### Context events
Are available via *window.Equilibrium.getContext().events*
- _'account'_ event should be emitted on account change(this also applies to _logout_)
```js
const { events } = window.Equilibrium.getContext();
...
events.emit('account'); // this should be fired in your code after login, logout or account change
```
