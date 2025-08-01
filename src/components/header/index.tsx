import { type Component } from "solid-js"
import type { HeaderProps } from "./types"
import { WindowControl } from "../window-control"
import style from "./styles.module.css"

export const Header: Component<HeaderProps> = () => {

    return (
        <header class={style.header}>
            <WindowControl />
        </header>
    )
}
