import { type RenderControlRef, RenderControl } from "@components"
import { createSignal, onMount, type Component } from "solid-js"
import { ConfirmationSection, NameSection, PassSection } from "./sections"
import style from "./styles.module.css"
import { useHeaderContext } from "@context"
import { VaultPreview } from "./vault-preview"

export const CreateVault: Component = () => {
    const headerContext = useHeaderContext()

    let renderControlRef: RenderControlRef
    const [getName, setName] = createSignal("")
    // const [getPass, setPass] = createSignal("")
    // const [getConfirmedPass, setConfirmedPass] = createSignal("")

    onMount(() => {
        headerContext.setData({
            titles: ["Create Vault"]
        })
    })

    return (
        <div class={style.wrapper}>
            <RenderControl
                ref={(ref) => renderControlRef = ref}
                elements={[
                    <NameSection
                        getName={getName}
                        setName={setName}
                        goNext={() => renderControlRef.next()}
                    />,
                    <PassSection />,
                    <ConfirmationSection />
                ]}
            />
            <VaultPreview
                name={getName()}
                pass={""}
                passSeparator="" />
        </div>
    )
}
