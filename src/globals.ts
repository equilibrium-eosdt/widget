import { createLocaleTemplateFunction } from "./util";

const data = {
  counter: 0,
};

export const autoIncrement = () => ++data.counter;

export let t = createLocaleTemplateFunction({});

export const setLocale = (
  locale: { [key: string]: string[] },
  extract?: Map<string, string[]>,
) => {
  const localeMap = Object.keys(locale).reduce(
    (map, key) => map.set(key, locale[key]),
    new Map<string, string[]>(),
  );

  if (!extract) {
    t = createLocaleTemplateFunction({ locale: localeMap });
  } else {
    t = createLocaleTemplateFunction({ locale: localeMap, extract });
  }
};
