import { type ParentComponent } from "solid-js"
import { Aside, Header } from "@components"
import style from "./layout.module.css"

export const Layout: ParentComponent = (props) => {

    return (
        <div class={style.layout}>
            <Aside />
            <div class={style.wrapper}>
                <Header />
                <main class={style.main}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}
