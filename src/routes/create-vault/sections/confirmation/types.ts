export interface ConfirmationSectionProps {
    goPrevious: () => void | Promise<void> | Promise<boolean>
    password: string
    vaultName: string
}
