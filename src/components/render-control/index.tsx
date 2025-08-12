import { type Component, createSignal, splitProps } from "solid-js"
import type { RenderControlProps } from "./types"
import style from "./styles.module.css"

export const RenderControl: Component<RenderControlProps> = (props) => {
    let wrapperRef: HTMLDivElement
    const [, rest] = splitProps(props, ["ref", "elements"])

    const [getCurrentIndex, setCurrentIndex] = createSignal(0)

    const elementsQuantity = props.elements.length

    const startTransition = async (
        callback: () => void
    ) => new Promise((resolve) => {
        wrapperRef.classList.add("hide")
        setTimeout(() => {
            callback()
            wrapperRef.classList.remove("hide")
            resolve(true)
        }, 120)
    })

    const next = async () => {
        if (elementsQuantity - 1 === getCurrentIndex()) return false
        await startTransition(() => setCurrentIndex(oldIndex => oldIndex + 1))
        return true
    }

    const previous = async () => {
        if (getCurrentIndex() === 0) return false
        await startTransition(() => setCurrentIndex(oldIndex => oldIndex - 1))
        return true
    }

    const goTo = async (elementIndex: number) => {
        const invalidValue = (
            elementIndex < 0
            || elementIndex >= elementsQuantity
            || elementIndex === getCurrentIndex()
        )
        if (invalidValue) return false
        await startTransition(() => setCurrentIndex(elementIndex))
        return true
    }

    props.ref({ next, previous, goTo })

    return (
        <div
            {...rest}
            ref={(element) => wrapperRef = element}
            class={style.wrapper}
        >
            {props.elements[getCurrentIndex()]}
        </div>
    )
}
