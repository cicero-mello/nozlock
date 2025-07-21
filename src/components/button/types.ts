import type { JSX } from "solid-js"

export type ButtonMode = "main" | "soft"

export interface ButtonProps extends
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: ButtonMode
}
