import { type Component, createUniqueId, onMount } from "solid-js"
import type { CheckboxProps } from "./types"
import style from "./styles.module.css"

export const Checkbox: Component<CheckboxProps> = (props) => {
    let inputRef: HTMLInputElement
    const id = props.id ?? createUniqueId()

    onMount(() => {
        if (!props.defaultChecked) return
        inputRef.checked = props.defaultChecked
    })

    return (
        <div id={id} class={style.wrapper + " checkbox"}>
            {props.labelText && (
                <label
                    class={style.label}
                    for={id + "input"}
                    children={props.labelText}
                />
            )}
            <input
                id={id + "input"}
                ref={element => inputRef = element}
                type="checkbox"
                class={style.input}
                name={props.inputName}
                onChange={(e) => props.onChange?.(e.target.checked)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.currentTarget.click()
                    }
                }}
            />
        </div>
    )
}
