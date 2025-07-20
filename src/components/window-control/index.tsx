import { getCurrentWindow } from '@tauri-apps/api/window'
import style from "./styles.module.css"

export const WindowControl = () => {
    const appWindow = getCurrentWindow()

    const handleMouseDownDragWindowArea = (
        event: MouseEvent
    ) => {
        const isLeftClick = event.buttons === 1
        if (!isLeftClick) return

        const isDoubleClick = event.detail === 2
        if (isDoubleClick) appWindow.toggleMaximize()
        else appWindow.startDragging()
    }

    return (
        <div class={style.wrapper}>
            <div
                class={style['window-drag']}
                onMouseDown={handleMouseDownDragWindowArea}
            >
            </div>
            <div class={style["window-buttons"]}>
                <button
                    aria-hidden="true"
                    tabIndex={-1}
                    class={`${style.button} ${style["minimize-window"]}`}
                    onClick={appWindow.minimize}
                />
                <button
                    aria-hidden="true"
                    tabIndex={-1}
                    class={`${style.button} ${style["maximize-window"]}`}
                    onClick={appWindow.toggleMaximize}
                />
                <button
                    aria-hidden="true"
                    tabIndex={-1}
                    class={`${style.button} ${style["close-window"]}`}
                    onClick={appWindow.close}
                />
            </div>
        </div >
    )
}
