import type { SoftModalBaseProps, SoftModalFooterProps, SoftModalTextProps, SoftModalTitleProps } from "./types"
import { createSignal, splitProps, type ParentComponent } from "solid-js"
import { useOutsideClick, useOutsideFocus } from "@hooks"
import style from "./styles.module.css"
import { Portal } from "solid-js/web"

const Base: ParentComponent<SoftModalBaseProps> = (props) => {
    const [, rest] = splitProps(props, ["children", "ref"])
    const [getIsOpen, setIsOpen] = createSignal(false)
    const [getModal, setModal] = createSignal<HTMLDivElement>()

    const close = () => {
        setIsOpen(false)
    }

    const open = () => {
        setIsOpen(true)
        const modalElement = getModal() as HTMLElement
        modalElement.tabIndex = 0
        modalElement.focus()
        modalElement.tabIndex = -1
    }

    props.ref({ open, close })

    useOutsideClick(getModal, close)
    useOutsideFocus(getModal, close)

    return (
        <>
            {getIsOpen() && (
                <Portal
                    mount={document.getElementById("main")!}
                    ref={(e) => {
                        e.style.position = "absolute"
                        e.style.height = "100%"
                        e.style.width = "100%"
                        e.style.top = "0"
                    }}
                >
                    <div class={style.wrapper} {...rest}>
                        <div
                            class={style.modal}
                            ref={(e) => { setModal(e) }}
                        >
                            {props.children}
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}

const Title: ParentComponent<SoftModalTitleProps> = (props) => {
    const [, rest] = splitProps(props, ["children"])

    return (
        <h2 class={style.title} {...rest}>
            {props.children}
        </h2>
    )
}

const Text: ParentComponent<SoftModalTextProps> = (props) => {
    const [, rest] = splitProps(props, ["children"])

    return (
        <p class={style.paragraph} {...rest}>
            {props.children}
        </p>
    )
}

const Footer: ParentComponent<SoftModalFooterProps> = (props) => {
    const [, rest] = splitProps(props, ["children"])

    return (
        <footer class={style.footer} {...rest}>
            {props.children}
        </footer>
    )
}

export const SoftModal = {
    Base,
    Title,
    Text,
    Footer
}
