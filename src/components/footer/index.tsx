import { GitHubSVG } from "@components/svg/git-hub"
import styles from "./styles.module.css"
import { Component } from "solid-js"
import { A } from "@solidjs/router"

export const Footer: Component = (props) => {

    const handleAnchorClick = (
        event: MouseEvent & { currentTarget: HTMLAnchorElement }
    ) => {
        event.currentTarget?.blur()
    }

    return (
        <footer class={styles.footer} {...props}>
            <a
                children={<GitHubSVG />}
                target="_blank"
                href="https://github.com/cicero-mello"
                class={styles["svg-anchor"]}
                onClick={handleAnchorClick}
            />
            <nav class={styles.nav}>
                <span>
                    <A
                        children="Import Vault"
                        class={styles.anchor}
                        href="/import-vault"
                        onClick={handleAnchorClick}
                    /> |
                </span>
                <span>
                    <A
                        children="About"
                        class={styles.anchor}
                        href="/about"
                        onClick={handleAnchorClick}
                    /> |
                </span>
                <span>
                    <A
                        children="Settings"
                        class={styles.anchor}
                        href="/settings"
                        onClick={handleAnchorClick}
                    /> |
                </span>
                <A
                    children="Donate"
                    class={styles.anchor}
                    href="/donate"
                    onClick={handleAnchorClick}
                />
            </nav>
        </footer>
    )
}
