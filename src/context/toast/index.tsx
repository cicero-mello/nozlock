import { createContext, createSignal, useContext, type ParentComponent } from "solid-js"
import type { ShowToastOptions, ToastContextValues, ToastState } from "./types"
import { Toast } from "@components/toast"
import { Portal } from "solid-js/web"

const ToastContext = createContext<ToastContextValues>()

export const useToast = () => {
    const context = useContext(ToastContext)

    if (!context) throw new Error(
        "useToast must be used only inside a ToastContextProvider"
    )

    return context
}

const DEFAULT_TOAST_DURATION = 2600

export const ToastContextProvider: ParentComponent = (props) => {
    const [toastParams, setToastParams] = createSignal<ToastState | null>(null)
    let timeoutId: number

    const show = (text: string, options?: ShowToastOptions) => {
        clearTimeout(timeoutId)
        hide()

        setToastParams({
            text,
            duration: options?.duration ?? DEFAULT_TOAST_DURATION,
            mountOn: options?.mountOn ?? document.getElementById("main")!
        })

        timeoutId = setTimeout(() => {
            hide()
        }, options?.duration ?? DEFAULT_TOAST_DURATION)
    }

    const hide = () => {
        setToastParams(null)
    }

    return (
        <ToastContext.Provider value={{ show, hide }}>
            <>
                {toastParams() && (
                    <Portal mount={toastParams()!.mountOn}>
                        <Toast
                            text={toastParams()!.text}
                            timeout={toastParams()!.duration}
                        />
                    </Portal>
                )}
                {props.children}
            </>
        </ToastContext.Provider>
    )
}
