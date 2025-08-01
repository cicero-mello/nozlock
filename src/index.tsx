/* @refresh reload */
import { render } from "solid-js/web"
import { Router, Route } from "@solidjs/router"
import * as R from "./routes"
import "./globals.css"

render(
    () => (
        <Router root={R.Layout}>

            <Route path="/" component={R.Home} />

            <Route path="/create-vault" component={R.CreateVaultLayout} >
                <Route path="/" component={R.CreateVault} />
            </Route>

            <Route path="/vault/:id" component={R.VaultLayout}>
                <Route path="/" component={R.Vault} />
                <Route path="/note/:id" component={R.VaultNote} />
                <Route path="/password/:id" component={R.VaultPassword} />
            </Route>

            <Route path="/settings" component={R.SettingsLayout}>
                <Route path="/" component={R.Settings} />
                <Route path="/hidden-vaults" component={R.HiddenVaults} />
            </Route>

            <Route path="/about" component={R.About} />
            <Route path="/donate" component={R.Donate} />
            <Route path="/import-vault" component={R.ImportVault} />

            <Route path="*" component={R.NotFound} />

        </Router>
    ), document.getElementById("root") as HTMLElement
)
