export interface CheckboxProps {
    labelText?: string
    defaultChecked?: boolean
    onChange?: (checked?: boolean) => void | Promise<void>
    id?: string
    inputName?: string
}
