import type { ButtonMode } from "../button/types"
import type { AnchorProps as AP } from "@solidjs/router"

export type AnchorMode = ButtonMode

export interface AnchorProps extends AP {
    mode?: AnchorMode
}
