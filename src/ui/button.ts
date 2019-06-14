import { t } from "../globals";
import { WidgetDef, TemplateArg } from "../widget";

export interface ButtonState {
  pending: boolean;
  onClick?: () => Promise<void>;
}

export default function createButton(params: {
  name: string;
  className?: string;
  handler?: () => Promise<void>;
  submit?: boolean;
}): TemplateArg {
  const { name, className, handler, submit } = params;

  const Button: WidgetDef<ButtonState, {}> = {
    state: { pending: false, onClick: undefined },

    onInit: async (w) => {
      const el = w.find();

      if (!el) {
        throw new Error(t`failed to render`);
      } else if (submit) {
        (<HTMLButtonElement>el).type = "submit";
      }

      if (handler) {
        w.update({
          onClick: async () => {
            w.update({ pending: true });
            await handler();
            w.update({ pending: false });
          },
        });
      }
    },

    onUpdate: async (w) => {
      const { onClick } = w.state;
      const el = w.find();

      if (el && onClick) {
        el.addEventListener("click", onClick);
      }
    },

    render: (state) => {
      if (state.pending) {
        return "Loading...";
      }

      return name;
    },
  };

  return { id: name, className, type: Button, element: "button" };
}
