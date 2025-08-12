import type { Accessor, Setter } from "solid-js"

export interface NameSectionProps {
    getName: Accessor<string>
    setName: Setter<string>
    goNext: () => void | Promise<void> | Promise<boolean>
}
