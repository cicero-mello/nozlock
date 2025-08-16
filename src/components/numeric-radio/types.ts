export interface NumericRadioRef {
    focus: () => void
}

export interface NumericRadioProps {
    maxValue: number
    minValue: number
    inputName?: string
    defaultChecked?: number
    onChange?: (inputValue: number) => void | Promise<void>
    startWithFocus?: boolean
    labelText?: string
    ref?: (ref: NumericRadioRef) => void
}
