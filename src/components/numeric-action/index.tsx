import { createSignal, splitProps, type Component } from "solid-js"
import type { NumericRadioRef } from "../numeric-radio/types"
import type { NumericActionProps } from "./types"
import { NumericRadio } from "../numeric-radio"
import { useAnimation } from "./animation"
import { InfoSVG } from "../svg"
import style from "./styles.module.css"

export const NumericAction: Component<NumericActionProps> = (props) => {
    let numericRadioRef: NumericRadioRef
    const [getButtonRef, setButtonRef] = createSignal<HTMLElement>()

    let currentRadioValue = (
        props.radioProps.defaultChecked
        ?? props.radioProps.minValue
    )

    const [, rest] = splitProps(props, [
        "radioProps",
        "labelText",
        "onAction",
        "onClickInfo",
        "svgComponent",
        "animationMode"
    ])

    useAnimation(getButtonRef, props.animationMode)

    return (
        <div class={style.wrapper} {...rest}>
            {props.onClickInfo && (
                <button
                    type="button"
                    class={style["info-button"]}
                    children={<InfoSVG />}
                    on:click={(event) => {
                        event.currentTarget.blur()
                        props.onClickInfo?.()
                    }}
                />
            )}
            {props.labelText && (
                <span class={style.label} on:click={() => {
                    numericRadioRef.focus()
                }}>
                    {props.labelText}
                </span>
            )}
            <div
                class={style["action-wrapper"]}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        event.stopPropagation()
                        getButtonRef()!.click()
                    }
                }}
            >
                <button
                    tabIndex={-1}
                    ref={(element) => { setButtonRef(element) }}
                    class={style["action-button"]}
                    on:mousedown={(event) => event.preventDefault()}
                    on:click={() => {
                        numericRadioRef.focus()
                        if (props.onAction) {
                            props.onAction(currentRadioValue)
                        }
                    }}
                >
                    {props.svgComponent()}
                </button>
                <NumericRadio
                    maxValue={props.radioProps.maxValue}
                    minValue={props.radioProps.minValue}
                    defaultChecked={props.radioProps.defaultChecked}
                    inputName={props.radioProps.inputName}
                    labelText={props.radioProps.labelText}
                    startWithFocus={props.radioProps.startWithFocus}
                    onChange={(newValue) => {
                        currentRadioValue = newValue
                        if (props.radioProps.onChange) {
                            props.radioProps.onChange(newValue)
                        }
                    }}
                    ref={(ref) => {
                        numericRadioRef = ref
                        if (props.radioProps.ref) {
                            props.radioProps.ref(ref)
                        }
                    }}
                />
            </div>
        </div>
    )
}
