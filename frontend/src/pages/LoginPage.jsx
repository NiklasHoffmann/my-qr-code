import React from "react"

import LoginForm from "components/Login/LoginForm"

function LoginPage() {
    return (
        <main className="contentGrid">
            <h2 className="flexCenter">Melde dich an um in deinen persönlichen Bereich zu kommen!</h2>
            <LoginForm></LoginForm>
        </main>
    )
}

export default LoginPage
