import { Button, Input, SoftModal, type SoftModalRef } from "@components"
import { onMount, type Component } from "solid-js"
import type { NameSectionProps } from "./types"
import style from "./styles.module.css"
import { useToast } from "@context"
import * as api from "@api"

export const NameSection: Component<NameSectionProps> = (props) => {
    const toast = useToast()

    let modalRef: SoftModalRef
    let sectionRef: HTMLElement
    let inputRef: HTMLInputElement

    const validateName = async () => {
        if (!props.getName()) {
            console.log(sectionRef)
            toast.show("Invalid Name", { mountOn: sectionRef })
            return false
        }
        if (props.getName().length > 32) {
            toast.show("Use a Shorter Name", { mountOn: sectionRef })
            return false
        }
        try {
            const alreadyExists = await api.vaultAlreadyExists({ vaultName: props.getName() })
            if (alreadyExists) {
                toast.show("Vault Already Exists", { mountOn: sectionRef })
                return false
            }
        } catch (error) {
            toast.show(`${error}`, { mountOn: sectionRef })
            return false
        }

        return true
    }

    const handleNext = async () => {
        const isNameValid = await validateName()
        if (isNameValid) props.goNext()
    }

    onMount(() => {
        inputRef.focus()
    })

    return (
        <>
            <section class={style.section} ref={(element) => sectionRef = element}>
                <div class={style["center-box"]}>
                    <Input
                        labelText="Vault Name"
                        ref={(element) => inputRef = element}
                        onClickInfo={() => modalRef.open()}
                        value={props.getName()}
                        maxLength={32}
                        on:input={(event) => {
                            props.setName(event.currentTarget.value)
                        }}
                        on:keydown={(event) => {
                            if (event.key === "Enter") handleNext()
                        }}
                    />
                    <Button on:click={handleNext}>
                        Next
                    </Button>

                </div>
            </section>
            <SoftModal.Base ref={(element) => modalRef = element}>
                <SoftModal.Title>
                    What is a Vault?
                </SoftModal.Title>
                <SoftModal.Text>
                    A Vault is a safe place to save your passwords and other secrets.
                    <br />
                    No internet connection, you're on control.
                    <br /> <br />
                    All Vault Data are <b>RIGOROUSLY ENCRYPTED</b>.
                    <br />
                    Nozlock was developed to provide security even in the
                    worst-case scenario, when an hacker has your Vault files and also has quantum computing power.
                </SoftModal.Text>
                <SoftModal.Footer>
                    <Button mode="modal-primary" on:click={() => modalRef.close()}>
                        Close
                    </Button>
                </SoftModal.Footer>
            </SoftModal.Base>
        </>
    )
}
