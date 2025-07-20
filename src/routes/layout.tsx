import { onCleanup, onMount, ParentComponent } from "solid-js"
import { Footer, WindowControl } from "@components"

export const Layout: ParentComponent = (props) => {
    let mainRef: HTMLElement | undefined
    let footerRef: HTMLElement | undefined

    onMount(() => {
        if (!footerRef || !mainRef) return

        const updateMainPaddingBottom = () => {
            mainRef.style.paddingBottom = (
                footerRef.offsetHeight + "px"
            )
        }

        const observer = new ResizeObserver(
            updateMainPaddingBottom
        )

        observer.observe(footerRef)
        onCleanup(() => observer.disconnect())
    })

    return (
        <>
            <WindowControl />
            <main ref={mainRef}>
                {props.children}
            </main>
            <Footer ref={footerRef} />
        </>
    )
}
