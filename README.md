# Equilibrium Framework Widgets
## Getting started
- Include _Equilibrium widget injector_ somewhere in your html, eg.
```html
<!doctype html>
<html>
...
<body>
...
<script async src="/inject.js"></script>
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
  injectEOSClient: (client: Client) => void;
  getContext: () => Context;
  Widgets: {
    Position: (el: HTMLElement) => Widget | null;
    Scatter?: (el: HTMLElement) => Widget | null;
  };
}
```
- _isReady()_ - returns ready state of widgets(widgets are ready when the client is injected and initialized)
- _injectEOSClient(client: Client)_ - injects EOS Client and fires `equilibrium:ready` event, you can either have your own client implementation based on the interface below, or use bundle with built-in scatter connector
- _getContext()_ - reurns widget context(interface is described below)
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

