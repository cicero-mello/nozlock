import { type ParentComponent, splitProps } from "solid-js"
import type { AnchorProps } from "./types"
import { A } from "@solidjs/router"
import style from "../button/styles.module.css"

export const Anchor: ParentComponent<AnchorProps> = (props) => {
    const [, rest] = splitProps(props, ["mode", "classList"])

    return (
        <A
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
