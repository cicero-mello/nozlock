import type { DicewareGeneratorResponse } from "@api"
import type { Accessor, Setter } from "solid-js"

export interface PassSectionProps {
    setDiceware: Setter<DicewareGeneratorResponse>
    getDiceware: Accessor<DicewareGeneratorResponse>
    goNext: () => void | Promise<void> | Promise<boolean>
    goPrevious: () => void | Promise<void> | Promise<boolean>
}
