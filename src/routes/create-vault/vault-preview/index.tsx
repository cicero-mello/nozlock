import { type Component } from "solid-js"
import style from "./styles.module.css"
import type { VaultPreviewProps } from "./types"
import { VaultSVG } from "@components/svg"

export const VaultPreview: Component<VaultPreviewProps> = (props) => {
    const escapedSeparator = props.passSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedSeparator})`, "g")

    return (
        <div class={style.wrapper}>
            <div class={style.texts}>
                {props.name && (
                    <p>{props.name}</p>
                )}
                {props.pass && (
                    <p>{props.pass.split(regex).map((value, index) => {
                        if (index % 2 === 0) return <>{value}</>
                        return <span class={style.foda}>{value}</span>
                    })}</p>
                )}
            </div>
            <VaultSVG />
        </div>
    )
}
