import { SettingsSVG, VaultSVG } from "@components/svg"
import { useHeaderContext } from "@context"
import style from "./styles.module.css"
import { createMemo } from "solid-js"

export const Title = () => {
    const headerContext = useHeaderContext()

    const titleContent = createMemo(() => {
        const text = headerContext.data.titles.reduce((accumulator, title, index) => {
            return accumulator + (index > 0 ? " » " : "") + title
        }, "")
        return text
    })

    return (
        <div class={style.title}>
            {headerContext.data.icon === "vault" && (
                <VaultSVG />
            )}
            {!!titleContent() && (
                <h1>{titleContent()}</h1>
            )}
            {headerContext.data.onClickSettings && (
                <div class={style['settings-wrapper']}>
                    <span />
                    <button
                        aria-label="Settings"
                        on:mousedown={(e) => { e.stopPropagation() }}
                        on:click={(e) => {
                            e.currentTarget.blur()
                            headerContext.data.onClickSettings!()
                        }}
                    >
                        <SettingsSVG />
                    </button>
                </div>
            )}
        </div>
    )
}
