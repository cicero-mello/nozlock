export interface ToastState {
    text: string
    mountOn: HTMLElement
    duration: number
}

export interface ShowToastOptions {
    mountOn?: HTMLElement
    duration?: number
}

export interface ToastContextValues {
    hide: () => void
    show: (
        text: string,
        options?: ShowToastOptions
    ) => void
}
