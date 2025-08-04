import { createContext, type ParentComponent, useContext } from "solid-js"
import type { HeaderContextValues, HeaderData } from "./types"
import { createStore } from "solid-js/store"

const HeaderContext = createContext<HeaderContextValues>()

export const useHeaderContext = (): HeaderContextValues => {
    const context = useContext(HeaderContext)

    if (!context) throw new Error(
        "useHeaderContext must be used only inside of HeaderContextProvider"
    )

    return context
}

export const HeaderContextProvider: ParentComponent = (props) => {
    const [headerState, setHeaderState] = createStore<HeaderData>({
        titles: [],
        icon: undefined,
        onClickSettings: undefined
    })

    const clearData = () => {
        setHeaderState({
            titles: [],
            icon: undefined,
            onClickSettings: undefined
        })
    }

    return (
        <HeaderContext.Provider value={{
            data: headerState,
            setData: setHeaderState,
            clearData
        }}>
            {props.children}
        </HeaderContext.Provider>
    )
}
