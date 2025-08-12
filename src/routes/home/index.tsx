import type { ParentComponent } from "solid-js"
import { LogoSVG } from "@components"
import style from "./styles.module.css"
import { useHeaderContext } from "@context"

export const Home: ParentComponent = () => {
    const headerContext = useHeaderContext()
    headerContext.clearData()

    return (
        <div class={style.content}>
            <LogoSVG />
        </div>
    )
}
