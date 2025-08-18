import { Button, DiceSVG, NumericAction, SoftModal, type SoftModalRef } from "@components"
import { type Component, createSignal, onMount } from "solid-js"
import type { PassSectionProps } from "./types"
import style from "./styles.module.css"
import { useToast } from "@context"
import * as api from "@api"

export const PassSection: Component<PassSectionProps> = (props) => {
    let modalRef: SoftModalRef
    let sectionRef: HTMLElement
    const toast = useToast()
    const [getDicewareText, setDicewareText] = createSignal<string[]>()

    const handleNewText = async (wordsQuantity: number) => {
        try {
            const response = await api.dicewareGenerator({ wordsQuantity })
            const escapedSeparator = response.separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`(${escapedSeparator})`, "g")
            setDicewareText(response.password.split(regex))
            props.setDiceware(response)
        }
        catch (error) {
            toast.show(`${error}`, { mountOn: sectionRef })
        }
    }

    onMount(() => {
        if (!props.getDiceware().separator || !props.getDiceware().password) return
        const escapedSeparator = props.getDiceware().separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(${escapedSeparator})`, "g")
        setDicewareText(props.getDiceware().password.split(regex))
    })

    return (
        <>
            <section
                class={style.section}
                ref={(element) => sectionRef = element}
            >
                <div class={style["center-box"]}>
                    <NumericAction
                        labelText="Vault Password"
                        onClickInfo={() => modalRef.open()}
                        onAction={(e) => handleNewText(e)}
                        animationMode="dice"
                        svgComponent={() => <DiceSVG />}
                        radioProps={{
                            maxValue: 12,
                            minValue: 9,
                            labelText: "Words",
                            startWithFocus: true,
                            defaultChecked: 9
                        }}
                    />
                    <div class={style["text-preview"]}>
                        {!getDicewareText() && (
                            <span>Roll the dice to generate your Vault Password<br /> &nbsp;</span>
                        )}
                        {getDicewareText()?.map((value, index) => {
                            if (index % 2 === 0) return <>{value}</>
                            return <span class={style.separator}>{value}<wbr /></span>
                        })}
                    </div>
                    <nav class={style.nav}>
                        <Button
                            mode="soft"
                            on:click={props.goPrevious}
                            children="Return"
                        />
                        <Button
                            mode="main"
                            on:click={props.goNext}
                            disabled={!props.getDiceware().password}
                            children="Next"
                        />
                    </nav>
                </div>
            </section>
            <SoftModal.Base ref={(ref) => modalRef = ref}>
                <SoftModal.Title>
                    Why <i>Diceware</i>?
                </SoftModal.Title>
                <SoftModal.Text>
                    Your Vault Password is the <b>ONLY WAY TO ACCESS YOUR VAULT</b><br />
                    so you need to remember.
                </SoftModal.Text>
                <SoftModal.Text>
                    Random password's like "<i>dD&r0p79.A6%3df!@4_</i>" are good for safety, but bad to memorize.
                </SoftModal.Text>
                <SoftModal.Text>
                    <b><i>Diceware</i></b> offers safe and easy to remember passwords.<br />
                    (more words = more safety)
                </SoftModal.Text>
                <SoftModal.Text>
                    Here are some methods to help you to memorize them:
                </SoftModal.Text>
                <ol class={style["modal-list"]}>
                    <li><b>Story Method:</b> Make a weird or vivid story linking all words. </li>
                    <li><b>Visualization:</b> Picture each word as a clear, mental image. </li>
                    <li><b>Chunking:</b> Break into smaller groups of 3-4 words.</li>
                    <li><b>Repetition:</b> Write, type, or recite repeatedly over time. </li>
                    <li><b>Acronyms/Mnemonics:</b> Use first letters to form a memorable phrase.</li>
                </ol>
                <br /><br />
                <SoftModal.Title>
                    How many words should I use?
                </SoftModal.Title>
                <SoftModal.Text>
                    In Traditional Diceware, 11 words is enough against opponents with perfect
                    quantum machines (something that only exists in an ideal world).
                </SoftModal.Text>
                <SoftModal.Text>
                    However, <b><i>Nozlock's Diceware</i></b> uses an extra die,
                    boasting a dictionary of 46,656 words instead of 7,776!
                    Therefore, using 9 words here ends up being equivalent
                    to the 11 words in traditional Diceware!
                </SoftModal.Text>
                <ul class={style["modal-list"]}>
                    <li>
                        <b>9 words: </b>
                        In the extreme theoretical limit, the vault
                        can be cracked in 8 years.
                        In a more realistic scenario (still considering Grover's Algorithm),
                        it would take <b><i>trillions of years</i></b>.
                    </li>
                    <li>
                        <b>10 - 12 words: </b>
                        Even in the unattainable theoretical limit, the vault
                        would only be cracked after <b><i>thousands of years</i></b>.
                    </li>
                </ul>
                <br />
                <SoftModal.Footer>
                    <Button
                        mode="modal-primary"
                        children="Understood"
                        on:click={() => modalRef.close()}
                    />
                </SoftModal.Footer>
            </SoftModal.Base>
        </>
    )
}
