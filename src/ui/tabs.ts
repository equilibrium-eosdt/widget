import { t } from "../globals";
import { WidgetDef, TemplateWidget } from "../widget";

type TFunc = () => string;

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
  onSelect: () => Promise<void>;
}): TemplateWidget<TabState, {}> {
  const { id, tabs, className, onSelect } = params;

  const type = <WidgetDef<TabState, {}>>{
    state: { tabIndex: 0 },

    onInit: async (w) => {
      if (
        !tabs.every(({ id }, i) => {
          const el = w.find(`.${id}-tab`);

          if (!el) {
            return false;
          }

          el.addEventListener("click", w.update.bind(w, { tabIndex: i }));

          return true;
        })
      ) {
        throw new Error("Not all tabs processed");
      }
    },

    onUpdate: async (w, state) => {
      if (state.tabIndex !== w.state.tabIndex) {
        await onSelect();
      }

      if (
        !tabs.every(({ id }, i) => {
          const el = w.find(`.${id}-tab`);

          if (!el) {
            return false;
          }

          el.addEventListener("click", w.update.bind(w, { tabIndex: i }));

          return true;
        })
      ) {
        throw new Error(t`Not all tabs processed`);
      }
    },

    render: (state, r) => {
      const tab = tabs[state.tabIndex];

      return r`
      <div class="equil-position-manage__tabs-wrapper">
        <!-- span>I want to </span -->
        <div class="equil-position-manage__dropdownMenu">
          <!-- div class="equil-position-manage__activeTab">
          ${/* tab.name */ ""}
          </div -->
          <ul class="equil-position-manage__tabs">
            ${tabs
              .map(
                ({ id, name }, index) => r`
              <li class="${
                index === state.tabIndex
                  ? "equil-position-manage__tab--active "
                  : ""
              }${id}-tab equil-position-manage__tab">
                ${typeof name === "function" ? name() : name}
              </li>
          `,
              )
              .join("")}
          </ul>
        </div>
      </div>
  ${{ id: tab.id, type: tab.type }}
`;
    },
  };

  return { id, type, className };
}
