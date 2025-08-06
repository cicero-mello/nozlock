import { createSignal, createUniqueId, onMount, type Component } from "solid-js"
import { TriangleSVG } from "@components/svg"
import type { NumericRadioProps } from "./types"
import style from "./styles.module.css"

export const NumericRadio: Component<NumericRadioProps> = (props) => {
    if (props.maxValue < props.minValue) throw new Error(
        `"maxValue" must be greater or equal than "minValue"`
    )

    const id = createUniqueId()
    const inputRefs: HTMLInputElement[] = []
    const [getCurrentValue, setCurrentValue] = createSignal(props.defaultChecked ?? 0)

    const inputQuantityList = Array.from(
        { length: props.maxValue - props.minValue + 1 }
    )

    const overwriteUpDownArrowsNativeEvents = (
        event: KeyboardEvent,
        index: number
    ) => {
        if (event.key === "ArrowDown") {
            event.preventDefault()
            const prevInput = inputRefs[index - 1] ?? inputRefs[inputRefs.length - 1]
            if (prevInput) {
                prevInput.focus()
                prevInput.checked = true
                setCurrentValue(+prevInput.value)
                props.onChange?.(+prevInput.value)
            }
            return
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            const nextInput = inputRefs[index + 1] ?? inputRefs[0]
            if (nextInput) {
                nextInput.focus()
                nextInput.checked = true
                setCurrentValue(+nextInput.value)
                props.onChange?.(+nextInput.value)
            }
        }
    }

    const applyDefaultCheckedAndFocus = () => {
        if (typeof props.defaultChecked != "number") return

        const inputToCheck = inputRefs.find(
            input => +input.value === props.defaultChecked
        )

        if (!inputToCheck) return
        inputToCheck.checked = true

        if (!props.startWithFocus) return
        inputToCheck.focus()
    }

    onMount(() => {
        applyDefaultCheckedAndFocus()
    })

    const handleClickChangeValue = (direction: "next" | "previous") => {
        const currentInputIndex = inputRefs.findIndex(
            input => +input.value === getCurrentValue()
        )

        const targetInput = (
            direction === "previous" ? (
                inputRefs[currentInputIndex - 1]
                ?? inputRefs[inputRefs.length - 1]
            ) : (
                inputRefs[currentInputIndex + 1]
                ?? inputRefs[0]
            )
        )

        targetInput.focus()
        targetInput.checked = true
        setCurrentValue(+targetInput.value)
        props.onChange?.(+targetInput.value)
    }

    const focusCurrentInput = () => {
        const currentInput = inputRefs.find(
            (input) => +input.value === getCurrentValue()
        )
        currentInput?.focus()
    }

    return (
        <div class={style.wrapper + " numeric-radio"}>
            {props.labelText && (
                <label
                    class={style.label}
                    for={id + getCurrentValue()}
                    children={props.labelText}
                />
            )}
            <div class={style.commands} on:click={focusCurrentInput}>
                <button
                    aria-hidden="true"
                    on:mousedown={(e) => e.preventDefault()}
                    tabIndex={-1}
                    children={<TriangleSVG />}
                    on:click={() => handleClickChangeValue("previous")}
                />
                <p>{getCurrentValue()}</p>
                <button
                    aria-hidden="true"
                    on:mousedown={(e) => e.preventDefault()}
                    tabIndex={-1}
                    children={<TriangleSVG />}
                    on:click={() => handleClickChangeValue("next")}
                />
            </div>

            {inputQuantityList.map((_, index) => (
                <input
                    type="radio"
                    class={style.input}
                    ref={(el) => inputRefs[index] = el}
                    name={props.inputName ?? "numeric-radio"}
                    id={id + (index + props.minValue)}
                    value={index + props.minValue}
                    on:keydown={(event) => overwriteUpDownArrowsNativeEvents(event, index)}
                    on:change={(event) => {
                        setCurrentValue(+event.currentTarget.value)
                        props.onChange?.(+event.currentTarget.value)
                    }}
                />
            ))}
        </div>
    )
}
