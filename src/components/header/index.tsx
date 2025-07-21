import { type Component, Show, splitProps } from "solid-js"
import type { HeaderProps } from "./types"
import { A } from "@solidjs/router"
import { LogoSVG } from "../svg"
import style from "./styles.module.css"

export const Header: Component<HeaderProps> = (props) => {
    const [, rest] = splitProps(props, ["title", "classList"])

    return (
        <header
            {...rest}
            classList={{
                [style.header]: true,
                ...props.classList
            }}
        >
            <A
                href="/"
                class={style['logo-anchor']}
            >
                <LogoSVG />
            </A>
            <Show when={props.title}>
                <h1 class={style.title}>{props.title}</h1>
            </Show>
        </header>
    )
}
