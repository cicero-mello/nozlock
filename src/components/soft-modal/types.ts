import type { JSX } from "solid-js"

export interface SoftModalRef {
    open: () => void
    close: () => void
}

export interface SoftModalBaseProps extends Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    "class" | "ref"> {
    ref: (ref: SoftModalRef) => void
}

export type SoftModalTitleProps = Omit<
    JSX.HTMLAttributes<HTMLHeadingElement>,
    "class"
>

export type SoftModalTextProps = Omit<
    JSX.HTMLAttributes<HTMLParagraphElement>,
    "class"
>

export type SoftModalFooterProps = Omit<
    JSX.HTMLAttributes<HTMLElement>,
    "class"
>
