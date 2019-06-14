interface LocaleTemplateParams {
    locale?: Map<string, string[]>;
    extract?: Map<string, string[]>;
}
export declare const createLocaleTemplateFunction: (params: LocaleTemplateParams) => (parts: TemplateStringsArray, ...args: any[]) => string;
export {};
