interface LocaleTemplateParams {
  locale?: Map<string, string[]>;
  extract?: Map<string, string[]>;
}

export const createLocaleTemplateFunction = (params: LocaleTemplateParams) => (
  parts: TemplateStringsArray,
  ...args: any[]
) => {
  const key = parts.join("${...}");

  if (params.extract) {
    params.extract.set(key, <string[]><any>parts);
  }

  let localeParts = parts;

  if (params.locale && params.locale.has(key)) {
    localeParts = <TemplateStringsArray><any>params.locale.get(key)!;
  }

  return localeParts.reduce((string, part, i) => {
    if (!args[i]) {
      return `${string}${part}`;
    }

    return `${string}${part}${args[i]}`;
  }, "");
};
