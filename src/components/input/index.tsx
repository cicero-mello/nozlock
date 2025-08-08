import { ClosedEyeSVG, InfoSVG, OpenEyeSVG } from "@components/svg"
import style from "./styles.module.css"
import { type Component, createSignal, createUniqueId, splitProps } from "solid-js"
import type { InputProps } from "./types"

export const Input: Component<InputProps> = (props) => {
    const [, rest] = splitProps(props,
        ["id", "onClickInfo", "labelText", "type"]
    )

    const id = props.id ?? createUniqueId()
    const [getInputType, setInputType] = createSignal(props.type)

    return (
        <div class={style.wrapper} id={id}>
            {props.onClickInfo && (
                <button
                    type="button"
                    class={style.button}
                    children={<InfoSVG />}
                    on:click={(event) => {
                        event.currentTarget.blur()
                        props.onClickInfo?.()
                    }}
                />
            )}

            {props.labelText && (
                <label for={id + "input"} class={style.label}>
                    {props.labelText}
                </label>
            )}

            <input
                id={id + "input"}
                class={style.input}
                type={getInputType()}
                spellcheck="false"
                autocomplete="off"
                {...rest}
            />

            {props.type === "password" && (
                <button
                    class={style["eye-button"] + " eye-button"}
                    onClick={() => {
                        setInputType(oldValue => {
                            if (oldValue === "password") return "text"
                            return "password"
                        })
                    }}
                >
                    {getInputType() === "password" ?
                        <ClosedEyeSVG /> : <OpenEyeSVG />
                    }
                </button>
            )}
        </div>
    )
}
