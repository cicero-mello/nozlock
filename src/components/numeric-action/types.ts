import type { NumericRadioProps } from "../numeric-radio/types"
import type { JSX } from "solid-js"

export interface NumericActionProps extends Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    "class" | "children"
> {
    radioProps: NumericRadioProps
    labelText?: string
    onAction?: (number: number) => void | Promise<void>
    onClickInfo?: () => void | Promise<void>
    svgComponent: () => JSX.Element
    animationMode?: "dice"
}
