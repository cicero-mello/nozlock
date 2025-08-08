import type { JSX } from "solid-js"

export interface InputProps extends Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "type" | "class"
> {
    onClickInfo?: () => void | Promise<void>
    labelText?: string
    type?: "text" | "password"
}
