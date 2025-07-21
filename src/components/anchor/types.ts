import type { AnchorProps as AP } from "@solidjs/router"

export type AnchorMode = "main" | "soft"

export interface AnchorProps extends AP {
    mode?: AnchorMode
}
