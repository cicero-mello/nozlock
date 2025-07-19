import { ParentComponent } from "solid-js"

export const Layout: ParentComponent = (props) => {

    return (
        <>
            <header>HEADER</header>
            <main>
                {props.children}
            </main>
            <footer>FOOTER</footer>
        </>
    )
}
