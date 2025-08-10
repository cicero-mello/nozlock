import { type ParentComponent, splitProps } from "solid-js"
import type { ButtonProps } from "./types"
import style from "./styles.module.css"

export const Button: ParentComponent<ButtonProps> = (props) => {
    const [, rest] = splitProps(props, ["mode", "classList"])

    return (
        <button
            {...rest}
            classList={{
                [style.button]: true,
                [style.main]: props.mode == "main" || !props.mode,
                [style.soft]: props.mode == "soft",
                [style["modal-primary"]]: props.mode === "modal-primary",
                [style["modal-secondary"]]: props.mode === "modal-secondary",
                ...props.classList
            }}
        />
    )
}
