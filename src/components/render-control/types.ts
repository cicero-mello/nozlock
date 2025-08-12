import type { JSX } from "solid-js"

export interface RenderControlRef {
    next: () => Promise<boolean>
    previous: () => Promise<boolean>
    goTo: (elementIndex: number) => Promise<boolean>
}

export interface RenderControlProps extends Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    "class" | "ref"> {
    ref: (ref: RenderControlRef) => void
    elements: JSX.Element[]
}
