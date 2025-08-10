import type { Accessor } from "solid-js"
import { createEffect, onCleanup } from "solid-js"

export const useOutsideFocus = (
    getElement: Accessor<HTMLElement | undefined>,
    callback: () => void | Promise<void>
) => {

    createEffect(() => {
        const element = getElement()
        if (!element) return

        const onFocusOutside = (event: Event) => {
            if (!element.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("focusin", onFocusOutside)

        onCleanup(() => {
            document.removeEventListener("focusin", onFocusOutside)
        })
    })
}
