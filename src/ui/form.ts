import { WidgetDef } from "../widget";
import Button from "./button";

export interface FormState {
  pending: boolean;
  error?: string;
  onSubmit?: (e: Event) => Promise<void>;
  submitButton: ReturnType<typeof Button>;
}

export default function createForm(params: {
  id: string;
  className?: string;
  fields: string[];
  handler: (data?: FormData) => Promise<void>;
}) {
  const { id, className, fields, handler } = params;

  const Form: WidgetDef<FormState, {}> = {
    state: {
      pending: false,
      submitButton: Button({ name: "OK", submit: true, className: "button" }),
    },

    onInit: async (w) => {
      const el = w.find();

      if (!el) {
        throw new Error("failed to render");
      }

      w.update({
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

      if (state.pending && !w.state.pending && !w.state.error) {
        for (let field of fields) {
          const input = w.find(`input[name=${field}]`);

          if (input) {
            (<HTMLInputElement>input).value = "";
          }
        }
      }
    },

    render: (state, r) => {
      return r`
${state.pending ? "<p>Loading...</p>" : ""}
${fields.map((name) => `<input class="input" type="text" name="${name}" />`).join("")}
${state.error ? `<p>${state.error}</p>` : ""}
${state.submitButton}
`;
    },
  };

  return { id, className, type: Form, element: "form" };
}
