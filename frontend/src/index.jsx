import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"

import { ProvideAuth } from "hooks/useAuth"

import App from "./App/App"

require("./styles/styles.scss")

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <ProvideAuth>
            <App />
        </ProvideAuth>
    </React.StrictMode>
)

reportWebVitals(console.log)
reportWebVitals()
