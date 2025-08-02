import { GitHubSVG, ImportSVG, LogoSVG, NotesSVG, SettingsSVG, VaultSVG } from "../svg"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { mockVaultNameList } from "./mock"
import { type Component } from "solid-js"
import style from "./styles.module.css"
import { A } from "@solidjs/router"

export const Aside: Component = () => {
    const appWindow = getCurrentWindow()

    const handleMouseDownOnDragWindowArea = (
        event: MouseEvent
    ) => {
        event.preventDefault()

        const isLeftClick = event.buttons === 1
        if (!isLeftClick) return

        const isDoubleClick = event.detail === 2
        if (isDoubleClick) appWindow.toggleMaximize()
        else appWindow.startDragging()
    }

    return (
        <aside class={style.aside}>
            <header
                class={style.header}
                onMouseDown={handleMouseDownOnDragWindowArea}
            >
                <A
                    href="/"
                    onMouseDown={(e) => { e.stopPropagation() }}
                    onClick={(e) => e.currentTarget.blur()}
                    aria-label="Home Page"
                    children={<LogoSVG />}
                />
            </header>
            <p class={style['vault-list-indicator']}>Vaults</p>
            <nav class={style.nav}>
                {mockVaultNameList.map(({ name, encoded }) => (
                    <A
                        href={`vault/${encoded}`}
                        onClick={(e) => { e.currentTarget.blur() }}
                    >
                        <VaultSVG /> <span>{name}</span>
                    </A>
                ))}
            </nav>
            <A
                id="new-vault-btn"
                href="/create-vault"
                children="New Vault"
                class={style['new-vault-button']}
                onClick={(e) => { e.currentTarget.blur() }}
            />
            <footer class={style.footer}>
                <A
                    href="/settings"
                    onClick={(e) => { e.currentTarget.blur() }}
                    children={<><SettingsSVG /> Settings</>}
                />
                <A
                    href="/import-vault"
                    onClick={(e) => { e.currentTarget.blur() }}
                    children={<><ImportSVG /> Import Vault</>}
                />
                <A
                    href="/about"
                    onClick={(e) => { e.currentTarget.blur() }}
                    children={<><NotesSVG /> About</>}
                />
                <a
                    href="https://github.com/cicero-mello/zlk"
                    target="_blank"
                    onClick={(e) => { e.currentTarget.blur() }}
                    children={<> <GitHubSVG /> Source Code</>}
                />
            </footer>
        </aside>
    )
}
