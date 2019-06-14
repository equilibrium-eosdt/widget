import { WidgetDef, TemplateArg } from "../widget";
import { Context } from "../types";
export interface LoginState {
    loginButton?: TemplateArg;
    logoutButton?: TemplateArg;
    ready: boolean;
    loggedIn: boolean;
}
declare const Login: WidgetDef<LoginState, Context>;
export default Login;
