import { createSignal, onMount, type Component } from "solid-js"
import { getCurrentWindow } from "@tauri-apps/api/window"
import style from "./styles.module.css"
import { Title } from "./title"

export const Header: Component = () => {
    const appWindow = getCurrentWindow()
    const [windowIsMaximized, setWindowIsMaximized] = createSignal(false)

    onMount(async () => {
        const isMaximized = await appWindow.isMaximized()
        setWindowIsMaximized(isMaximized)
    })

    appWindow.onResized(async () => {
        const isMaximized = await appWindow.isMaximized()
        setWindowIsMaximized(isMaximized)
    })

    const handleMouseDownDragWindowArea = (
        event: MouseEvent
    ) => {
        event.preventDefault()

        const isLeftClick = event.buttons === 1
        if (!isLeftClick) return

        const isDoubleClick = event.detail === 2
        if (isDoubleClick) appWindow.toggleMaximize()
        else appWindow.startDragging()
    }

    return (
        <header class={style.header} onMouseDown={handleMouseDownDragWindowArea}>
            <Title />
            <div class={style["window-buttons"]}>
                <button
                    tabIndex={-1}
                    onMouseDown={(e) => { e.stopPropagation() }}
                    class={`${style.button} ${style["minimize-window"]}`}
                    onClick={appWindow.minimize}
                />
                <button
                    tabIndex={-1}
                    onMouseDown={(e) => { e.stopPropagation() }}
                    class={`${style.button} ${style["maximize-window"]}`}
                    classList={{ [style.maximized]: windowIsMaximized() }}
                    onClick={appWindow.toggleMaximize}
                />
                <button
                    tabIndex={-1}
                    onMouseDown={(e) => { e.stopPropagation() }}
                    class={`${style.button} ${style["close-window"]}`}
                    onClick={appWindow.close}
                />
            </div>
        </header>
    )
}
