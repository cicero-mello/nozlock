import { type ParentComponent, splitProps } from "solid-js"
import type { ButtonProps } from "./types"
import style from "../shared/styles/button.module.css"

export const Button: ParentComponent<ButtonProps> = (props) => {
    const [, rest] = splitProps(props, ["mode", "classList"])

    return (
        <button
            {...rest}
            classList={{
                [style.button]: true,
                [style.main]: props.mode != "soft",
                [style.soft]: props.mode == "soft",
                ...props.classList
            }}
        />
    )
}
