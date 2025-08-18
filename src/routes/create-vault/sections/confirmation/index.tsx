import { Button, Input, SoftModal, type SoftModalRef } from "@components"
import type { ConfirmationSectionProps } from "./types"
import { onMount, type Component } from "solid-js"
import { useNavigate } from "@solidjs/router"
import style from "./styles.module.css"
import { useToast } from "@context"
import * as api from "@api"

export const ConfirmationSection: Component<ConfirmationSectionProps> = (props) => {
    const navigate = useNavigate()
    const toast = useToast()
    let sectionRef: HTMLElement
    let infoModalRef: SoftModalRef
    let confirmationModalRef: SoftModalRef
    let inputRef: HTMLInputElement

    onMount(() => {
        inputRef.focus()
    })

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault()
        if (inputRef.value != props.password) {
            toast.show("Passwords do not match", { mountOn: sectionRef })
            inputRef.focus()
            inputRef.select()
            return
        }
        confirmationModalRef.open()
    }

    const createVault = async () => {
        try {
            await api.createVault({
                password: props.password,
                vaultName: props.vaultName
            })
            navigate("/")
            setTimeout(() => {
                toast.show("Vault Created!", { duration: 4500 })
            }, 300)
        } catch (error) {
            toast.show(error + "", { mountOn: sectionRef })
            confirmationModalRef.close()
        }
    }

    return (
        <section
            class={style.section}
            ref={(element) => sectionRef = element}
        >
            <form
                class={style["center-box"]}
                on:submit={handleSubmit}
            >
                <Input
                    onClickInfo={() => infoModalRef.open()}
                    ref={(ref) => inputRef = ref}
                    type="password"
                    labelText="Confirm Password"
                />
                <div class={style.actions}>
                    <Button
                        type="button"
                        mode="soft"
                        on:click={props.goPrevious}
                        children="Return"
                    />
                    <Button
                        type="submit"
                        mode="main"
                        children="Create Vault"
                    />
                </div>
            </form>

            <SoftModal.Base ref={(ref) => infoModalRef = ref}>
                <SoftModal.Title>
                    Time to memorize!
                </SoftModal.Title>
                <SoftModal.Text>
                    Write the password you generated earlier.
                    Feel free to copy it from the footer,
                    but if you haven't memorized it yet, at least write it down first.
                </SoftModal.Text>
                <SoftModal.Text>
                    Ideally, you wouldn't want to keep a note of it,
                    but during your memorization process, having a temporary
                    physical copy somewhere safe can be helpful (although risky).
                </SoftModal.Text>
                <SoftModal.Text>
                    And don't forget the random separator, like
                    <b><i> =</i></b>, <b><i>/</i></b>, <b><i>%</i></b>, <b><i>$</i></b>...
                </SoftModal.Text>
                <SoftModal.Footer>
                    <Button
                        on:click={() => infoModalRef.close()}
                        mode="modal-primary"
                        children="Understood"
                    />
                </SoftModal.Footer>
            </SoftModal.Base>

            <SoftModal.Base ref={(ref) => confirmationModalRef = ref}>
                <SoftModal.Title>
                    Final Confirmation
                </SoftModal.Title>
                <SoftModal.Text>
                    Once the vault is created, the password cannot be recovered.
                </SoftModal.Text>
                <SoftModal.Text>
                    To continue, confirm that you have memorized the password or at least written it down.
                </SoftModal.Text>
                <SoftModal.Footer>
                    <Button
                        on:click={() => confirmationModalRef.close()}
                        mode="modal-secondary"
                        children="Cancel"
                    />
                    <Button
                        on:click={createVault}
                        mode="modal-primary"
                        children="Confirm"
                    />
                </SoftModal.Footer>
            </SoftModal.Base>
        </section>
    )
}
