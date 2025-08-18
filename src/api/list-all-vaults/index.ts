import { query } from "@solidjs/router"
import { invoke } from "@tauri-apps/api/core"
import type { VaultNames } from "./types"

export const listAllVaults = query(async (): Promise<VaultNames[]> => {
    return await invoke("list_all_vaults")
}, "listAllVaults")
