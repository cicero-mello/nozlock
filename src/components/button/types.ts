import type { JSX } from "solid-js"

export type ButtonMode = (
    "main" | "soft" |
    "modal-primary" | "modal-secondary"
)

export interface ButtonProps extends
    JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: ButtonMode
}
