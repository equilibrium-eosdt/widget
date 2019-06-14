export interface TemplateWidget<S, C> {
    type: WidgetDef<S, C>;
    id: string;
    element?: string;
    className?: string;
}
declare type ScalarArg = undefined | boolean | string | number;
export declare type TemplateArg = ScalarArg | TemplateWidget<any, any>;
export declare type RenderTemplate = (parts: TemplateStringsArray, ...arg: TemplateArg[]) => string;
export declare type Render<S> = (state: S, r: RenderTemplate) => string;
export interface WidgetChildren<C> {
    [id: string]: {
        def: WidgetDef<any, C>;
        widget?: Widget<any, C>;
    };
}
export interface WidgetLifecycle<S, C> {
    onInit?: (widget: Widget<S, C>) => Promise<void>;
    onUpdate?: (widget: Widget<S, C>, prevState: S) => Promise<void>;
    render: Render<S>;
}
export interface WidgetState<S> {
    state: S;
}
export interface WidgetDef<S, C> extends WidgetLifecycle<S, C>, WidgetState<S> {
    [key: string]: any;
}
export declare class Widget<S, C = undefined> {
    ctx: C;
    private sig?;
    private id;
    private ready;
    private lifecycle;
    private element;
    children: WidgetChildren<C>;
    state: S;
    constructor(el: HTMLElement, def: WidgetDef<S, C>, ctx: C);
    private readyCheck;
    private updateChildren;
    private init;
    private renderTemplate;
    attach(el: HTMLElement): void;
    find(cssSelector?: string): HTMLElement | null;
    update(state: Partial<S>): void;
}
export {};
