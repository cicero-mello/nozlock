import { Component } from "solid-js"
import { GitHubSVG } from "@components/svg/git-hub"
import styles from "./styles.module.css"
import { A } from "@solidjs/router"

export const Footer: Component = (props) => {

    return (
        <footer class={styles.footer} {...props}>
            <a
                children={<GitHubSVG />}
                target="_blank"
                href="https://github.com/cicero-mello"
                class={styles["svg-anchor"]}
            />
            <nav class={styles.nav}>
                <A
                    children="Import Vault"
                    class={styles.anchor}
                    href="/import-vault"
                /> |
                <A
                    children="About"
                    class={styles.anchor}
                    href="/about"
                /> |
                <A
                    children="Settings"
                    class={styles.anchor}
                    href="/settings"
                /> |
                <A
                    children="Donate"
                    class={styles.anchor}
                    href="/donate"
                />
            </nav>
        </footer>
    )
}
