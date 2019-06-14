import { t } from "../globals";
import { WidgetDef } from "../widget";
import Button from "./button";

type Validator = (value: string) => string | undefined;
type StateValidator = (e: Event) => void;

export interface FormState {
  pending: boolean;
  error?: string;
  onSubmit?: (e: Event) => Promise<void>;
  submitButton: ReturnType<typeof Button>;
  validate: { [name: string]: StateValidator };
}

export default function createForm(params: {
  id: string;
  className?: string;
  fields: string[];
  handler: (data?: FormData) => Promise<void>;
  validate?: { [name: string]: Validator };
  label?: string[];
}) {
  const { id, className, fields, handler, validate, label } = params;

  const Form: WidgetDef<FormState, {}> = {
    state: {
      pending: false,
      submitButton: Button({ name: t`OK`, submit: true, className: "button" }),
      validate: {},
    },

    onInit: async (w) => {
      const el = w.find();

      if (!el) {
        throw new Error("failed to render");
      }

      w.update({
        validate: validate
          ? Object.keys(validate).reduce(
              (prev, field) => ({
                ...prev,
                [field]: (e: Event) => {
                  const error = validate[field](
                    (<HTMLInputElement>e.target!).value,
                  );
                  w.update({ error });
                },
              }),
              {},
            )
          : {},
        onSubmit: async (e) => {
          e.preventDefault();
          w.update({ error: undefined, pending: true });
          let data;

          if (e.target) {
            data = new FormData(<HTMLFormElement>e.target);
          }

          try {
            await handler(data);
            w.update({ pending: false });
          } catch (err) {
            w.update({ error: err.message, pending: false });
          }
        },
      });
    },

    onUpdate: async (w, state) => {
      const el = w.find();
      const {
        state: { onSubmit },
      } = w;

      if (el && onSubmit) {
        el.addEventListener("submit", onSubmit);
      }

      for (let field of fields) {
        const input = w.find(`input[name=${field}]`);

        if (input) {
          if (w.state.validate[field]) {
            input.addEventListener("change", w.state.validate[field]);
          }

          if (state.pending && !w.state.pending && !w.state.error) {
            (<HTMLInputElement>input).value = "";
          } // Clear on success;
        }
      }
    },

    render: (state, r) => {
      return r`
${state.pending ? `<span class="position-manage__pending">Loading...</span>` : ""}
${fields.map((name, i) =>
  `<div class="input-wrapper">
    ${label ? `<label class="input-label">${label[i]}</label>` : ""}
    <input class="input ${state.error ? 'input--error' : null}"}" placeholder="0.00" type="text" name="${name}" />
  </div>`,).join("")}
${state.error ? `<span class="position-manage__error">${state.error}</span>` : ""}
${state.submitButton}
`;
    },
  };

  return { id, className, type: Form, element: "form" };
}
