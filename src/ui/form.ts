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
  update: { [name: string]: StateValidator }; // TODO for now a hack
}

interface Fields {
  [field: string]: {
    decimals: number;
    label?: string;
  };
}

export default function createForm(params: {
  id: string;
  className?: string;
  fields: string[] | Fields;
  handler: (data?: FormData) => Promise<void>;
  validate?: { [name: string]: Validator };
}) {
  const { id, className, handler, validate } = params;

  const fields = Array.isArray(params.fields)
    ? params.fields.reduce(
        (fields, name) => ({ ...fields, [name]: { decimals: 2, label: "" } }),
        {},
      )
    : params.fields;

  const Form: WidgetDef<FormState, {}> = {
    state: {
      pending: false,
      submitButton: Button({
        name: t`OK`,
        submit: true,
        className: "equil-position-manage__button",
      }),
      validate: {},
      update: {},
    },

    onInit: async (w) => {
      const el = w.find();

      if (!el) {
        throw new Error("failed to render");
      }

      w.update({
        update: validate
          ? Object.keys(validate).reduce(
              (prev, field) => ({
                ...prev,
                [field]: (e: Event) =>
                  validate[field]((<HTMLInputElement>e.target!).value),
              }),
              {},
            )
          : {}, // TODO fix this hack
        validate: validate
          ? Object.keys(validate).reduce(
              (prev, field) => ({
                ...prev,
                [field]: (e: Event) => {
                  const error = validate[field](
                    (<HTMLInputElement>e.target!).value,
                  );

                  if (error) {
                    w.update({ error });
                  }
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

      for (let field of Object.keys(fields)) {
        const input = w.find(`input[name=${field}]`);

        if (input) {
          if (w.state.validate[field]) {
            input.addEventListener("change", w.state.validate[field]);
          }

          if (w.state.update[field]) {
            input.addEventListener("keyup", w.state.update[field]);
          }

          if (state.pending && !w.state.pending && !w.state.error) {
            (<HTMLInputElement>input).value = "";
          } // Clear on success;
        }
      }
    },

    render: (state, r) => {
      return r`
${
        state.pending
          ? `<span class="equil-position-manage__pending">Loading...</span>`
          : ""
      }
${Object.keys(fields)
        .map(
          (name) =>
            `<div class="equil-position-manage__input-wrapper">
    ${fields[name].label &&
      `<label class="equil-position-manage__input-label">${
        fields[name].label
      }</label>`}
    <input class="equil-position-manage__input ${
      state.error ? "equil-position-manage__input--error" : null
    }" placeholder="0.00" type="number" autocomplete="off" name="${name}" step="0.0001" />
  </div>`,
        )
        .join("")}
${
        state.error
          ? `<span class="equil-position-manage__error">${state.error}</span>`
          : ""
      }
${state.submitButton}
`;
    },
  };

  return { id, className, type: Form, element: "form" };
}
