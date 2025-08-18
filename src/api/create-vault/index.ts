import { invoke } from "@tauri-apps/api/core"
import type { CreateVaultParams } from "./types"

export const createVault = async ({
    password, vaultName
}: CreateVaultParams): Promise<void> => {
    return await invoke("create_vault", { password, vaultName })
}
