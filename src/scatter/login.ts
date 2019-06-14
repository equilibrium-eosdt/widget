import Client from "../client";
import { t } from "../globals";
import { WidgetDef, TemplateArg } from "../widget"
import { Button } from "../ui";
import { Context } from "../types";

export interface LoginState {
  loginButton?: TemplateArg;
  logoutButton?: TemplateArg;
  ready: boolean
  loggedIn: boolean;
}

const Login: WidgetDef<LoginState, Context> = {
  state: {
    loginButton: undefined,
    logoutButton: undefined,
    ready: false,
    loggedIn: false
  },

  onInit: async (w) => {
    const client = <Client>(w.ctx.client!);

    if (!client.api) {
      await client.init();

      w.update({
        logoutButton: Button({
          name: t`Logout`,
          className: "scatter-auth-button",
          handler: async () => {
            await client.logout();
            w.update({ loggedIn: !!client.getAccount() })
          }
        }),

        loginButton: Button({
          name: t`Login`,
          className: "scatter-auth-button",
          handler: async () => {
            await client.connect();
            w.update({ loggedIn: !!client.getAccount() })
          }
        }),

        ready: true,
        loggedIn: !!client.getAccount(),
      });
    }
  },

  onUpdate: async (w, state) => {
    const { ctx: { events } } = w;

    if (state.loggedIn !== w.state.loggedIn) {
      events.emit("account", w.state);
    }
  },

  render: (state, r) => {
    if (!state.ready) {
      return t`Loading...`;
    }

    if (state.loggedIn) {
      return r`${state.logoutButton}`;
    }

    return r`${state.loginButton}`
  },
};

export default Login;
