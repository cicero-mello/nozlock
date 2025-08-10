import type { Accessor } from "solid-js"
import { createEffect, onCleanup } from "solid-js"

export const useOutsideClick = (
    getElement: Accessor<HTMLElement | undefined>,
    callback: () => void | Promise<void>
) => {

    createEffect(() => {
        const element = getElement()
        if (!element) return

        const onClickOutside = (event: MouseEvent) => {
            if (!element.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("mousedown", onClickOutside)

        onCleanup(() => {
            document.removeEventListener("mousedown", onClickOutside)
        })
    })
}
