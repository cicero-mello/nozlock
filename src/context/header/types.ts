import type { SetStoreFunction } from "solid-js/store"

export interface HeaderData {
    titles: string[]
    icon?: "vault"
    onClickSettings?: () => void | Promise<void>
}

export interface HeaderContextValues {
    data: HeaderData
    setData: SetStoreFunction<HeaderData>
    clearData: () => void
}
