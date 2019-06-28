interface Theme {
    title: {
        color: string;
        font: string;
    };
    text: {
        color: string;
        font: string;
        boldFont: string;
    };
    button: {
        textColor: string;
        font: string;
        background: string;
    };
    background: {
        primary: string;
        secondary: string;
    };
}
export declare const setStyles: (theme?: Theme) => void;
export declare const setContainerStyle: (el: HTMLElement) => void;
export {};
