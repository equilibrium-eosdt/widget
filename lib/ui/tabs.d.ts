import { WidgetDef, TemplateWidget } from "../widget";
declare type TFunc = () => string;
interface TabItem {
    id: string;
    name: string | TFunc;
    type: WidgetDef<any, any>;
}
interface TabState {
    tabIndex: number;
}
export default function Tabs(params: {
    tabs: TabItem[];
    id: string;
    className?: string;
}): TemplateWidget<TabState, {}>;
export {};
