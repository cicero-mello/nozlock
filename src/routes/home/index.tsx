import type { ParentComponent } from "solid-js"
import { LogoSVG, Anchor } from "@components"
import style from "./styles.module.css"

export const Home: ParentComponent = () => {

    return (
        <div class={style.content}>
            <LogoSVG />
            <Anchor href="/create-vault">
                Create Your First Vault
            </Anchor>
        </div>
    )
}
