import { WidgetDef, TemplateWidget } from "../widget";

interface TabItem {
  id: string,
  name: string,
  type: WidgetDef<any, any>
}

interface TabState {
  tabIndex: number;
}

export default function Tabs(params: { tabs: TabItem[], id: string, className?: string }): TemplateWidget<TabState, {}> {
  const { id, tabs, className } = params;

  const type = <WidgetDef<TabState, {}>>{
    state: { tabIndex: 0 },

    onInit: async (w) => {
      if (!tabs.every(({ id }, i) => {
        const el = w.find(`.${id}-tab`);

        if (!el) {
          return false;
        }

        el.addEventListener("click", w.update.bind(w, { tabIndex: i }))

        return true;
      })) {
        throw new Error('Not all tabs processed')
      }
    },

    onUpdate: async (w) => {
      if (!tabs.every(({ id }, i) => {
        const el = w.find(`.${id}-tab`);

        if (!el) {
          return false;
        }

        el.addEventListener("click", w.update.bind(w, { tabIndex: i }))

        return true;
      })) {
        throw new Error('Not all tabs processed')
      }
    },

    render: (state, r) => {
      const tab = tabs[state.tabIndex];

      return r`
  <ul class="position-manage__tabs">${tabs.map(({ id, name }, index) => r`
    <li class="${index === state.tabIndex ? "position-manage__tab--active " : ""}${id}-tab position-manage__tab">
      ${name}
    </li>
`).join('')}
  </ul>
  ${{ id: tab.id, type: tab.type }}
`;
    }
  }

  return { id, type, className };
}
