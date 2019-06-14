import { TemplateArg } from "../widget";
export interface ButtonState {
    pending: boolean;
    onClick?: () => Promise<void>;
}
export default function createButton(params: {
    name: string;
    className?: string;
    handler?: () => Promise<void>;
    submit?: boolean;
}): TemplateArg;
