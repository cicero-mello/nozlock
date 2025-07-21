import { Header } from "@components/header"
import type { ParentComponent } from "solid-js"

export const CreateVaultLayout: ParentComponent = (props) => {

    return (
        <>
            <Header title="Create Vault" />
            {props.children}
        </>
    )
}
