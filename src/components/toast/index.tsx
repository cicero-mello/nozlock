import { onMount, type Component } from "solid-js"
import style from "./styles.module.css"
import type { ToastProps } from "./types"

export const Toast: Component<ToastProps> = (props) => {
    let ref: HTMLElement

    onMount(() => {
        setTimeout(() => {
            ref.style.opacity = "0"
        }, props.timeout - 300)
    })

    return (
        <p ref={(e) => ref = e} class={style.toast}>
            {props.text}
        </p>
    )
}
