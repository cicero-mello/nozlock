import type { DicewareGeneratorParams, DicewareGeneratorResponse } from "./types"
import { invoke } from "@tauri-apps/api/core"

export const dicewareGenerator = async ({
    wordsQuantity
}: DicewareGeneratorParams): Promise<DicewareGeneratorResponse> => {
    return await invoke("diceware_password_generator", { wordsQuantity })
}
