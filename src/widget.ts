import { autoIncrement } from "./globals";
import Signal from "./signal";

export interface TemplateWidget<S, C> {
  type: WidgetDef<S, C>;
  id: string;
  element?: string;
  className?: string;
}

type ScalarArg = undefined | boolean | string | number;

export type TemplateArg = ScalarArg | TemplateWidget<any, any>; // TODO arrays

export type RenderTemplate = (
  parts: TemplateStringsArray,
  ...arg: TemplateArg[]
) => string;

export type Render<S> = (state: S, r: RenderTemplate) => string;

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

export class Widget<S, C = undefined> {
  public ctx: C;
  private sig?: Signal;
  private id: number = autoIncrement();
  private ready: boolean = false;
  private lifecycle: WidgetLifecycle<S, C>;
  private element: HTMLElement;
  public children: WidgetChildren<C> = {};
  public state: S;

  constructor(el: HTMLElement, def: WidgetDef<S, C>, ctx: C) {
    const { state, onInit, onUpdate, render } = def;
    this.ctx = ctx;
    this.element = el;
    this.state = state;
    this.lifecycle = { onInit, onUpdate, render };
    this.init();
  }

  private readyCheck() {
    if (!this.ready) {
      throw new Error("Widget is not ready");
    }
  }

  private updateChildren(onlyInit: boolean = false) {
    for (let id of Object.keys(this.children)) {
      const { def, widget } = this.children[id];
      const className = `${id}-${this.id}`;
      const el = this.find("." + className);

      if (widget) {
        if (onlyInit) {
          throw new Error("Widget should not be initialized");
        }

        if (el) {
          widget.attach(el);
        }
      } else {
        if (el) {
          let { ctx } = this;

          this.children[id] = {
            ...this.children[id],
            widget: new Widget(el, def, ctx),
          };
        }
      }
    }
  }

  private init() {
    const {
      element,
      lifecycle: { onInit, render },
      state,
    } = this;
    this.sig = new Signal();

    if (element) {
      element.innerHTML = render(state, this.renderTemplate);
      this.updateChildren();
    } else {
      throw new Error("No mounting node");
    }

    if (onInit) {
      onInit(this)
        .then(() => {
          this.ready = true;
          this.sig!.emit();
        })
        .catch((err) => {
          element.innerHTML = `<span class="widget-error">${
            err.message
          }</span>`;
          // TODO only dev
          console.info("Error mounting node:", err.stack);
          this.sig!.cancel(err);
        });
    } else {
      this.ready = true;
      this.sig.emit();
    }
  }

  private renderTemplate = (
    parts: TemplateStringsArray,
    ...args: TemplateArg[]
  ): string => {
    return parts.reduce((prev, part, index) => {
      const arg = args[index];

      if (!arg) {
        return `${prev}${part}`;
      }

      if (typeof arg === "object") {
        const { id, type, element, className } = arg;
        const el = element || "div";
        let classes = `${id}-${this.id}`;

        if (className) {
          classes += ` ${arg.className}`;
        }

        if (!this.children[id]) {
          this.children[id] = { def: type };
        }

        return `${prev}${part}<${el} class="${classes}"></${el}>`;
      }

      return `${prev}${part}${arg}`;
    }, "");
  };

  public attach(el: HTMLElement) {
    this.readyCheck();
    this.element = el;
    this.update({});
  }

  public find(cssSelector?: string): HTMLElement | null {
    if (this.element) {
      if (!cssSelector) {
        return this.element;
      }

      return this.element.querySelector(cssSelector);
    }

    return null;
  }

  public update(state: Partial<S>) {
    this.sig!.wait()
      .then(() => {
        this.sig = new Signal();
        const { render, onUpdate } = this.lifecycle;
        const prevState = { ...this.state };
        this.state = { ...prevState, ...state };
        this.element.innerHTML = render(this.state, this.renderTemplate);
        this.updateChildren();

        if (onUpdate) {
          return onUpdate(this, prevState);
        }

        return;
      })
      .then(() => {
        this.sig!.emit();
      })
      .catch((err: Error) => {
        this.element.innerHTML = `<span class="widget-error">${
          err.message
        }</span>`;
        // TODO only dev
        console.info("Error updating node:", err.stack);
        this.sig!.cancel(err);
      });
  }
}
