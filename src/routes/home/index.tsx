import type { ParentComponent } from "solid-js"
import { LogoSVG } from "@components"
import style from "./styles.module.css"

export const Home: ParentComponent = () => {

    return (
        <div class={style.content}>
            <LogoSVG />
        </div>
    )
}
