import { invoke } from "@tauri-apps/api/core"
import type { VaultAlreadyExistsParams } from "./types"

export const vaultAlreadyExists = async ({
    vaultName
}: VaultAlreadyExistsParams): Promise<boolean> => {
    return await invoke("vault_already_exists", { vaultName })
}
