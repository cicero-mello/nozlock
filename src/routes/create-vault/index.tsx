import { type RenderControlRef, RenderControl } from "@components"
import { createSignal, onMount, type Component } from "solid-js"
import { ConfirmationSection, NameSection, PassSection } from "./sections"
import type { DicewareGeneratorResponse } from "@api"
import style from "./styles.module.css"
import { useHeaderContext } from "@context"
import { VaultPreview } from "./vault-preview"

export const CreateVault: Component = () => {
    const headerContext = useHeaderContext()

    let renderControlRef: RenderControlRef
    const [getName, setName] = createSignal("")
    const [getDiceware, setDiceware] = createSignal<DicewareGeneratorResponse>({
        password: "",
        separator: ""
    })

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
                    () => <NameSection
                        getName={getName}
                        setName={setName}
                        goNext={() => renderControlRef.next()}
                    />,
                    () => <PassSection
                        getDiceware={getDiceware}
                        setDiceware={setDiceware}
                        goNext={() => renderControlRef.next()}
                        goPrevious={() => renderControlRef.previous()}
                    />,
                    () => <ConfirmationSection />
                ]}
            />
            <VaultPreview
                name={getName()}
                pass={getDiceware().password}
                passSeparator={getDiceware().separator}
            />
        </div>
    )
}
