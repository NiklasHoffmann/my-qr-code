import React from "react"
import { useAuth } from "hooks/useAuth"

function HomePage() {
    const { user } = useAuth()
    const previousLogin = user && user.previousLogin ? new Date(user.previousLogin).toLocaleString() : "Nie eingeloggt"
    const lastLogin = user && user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Nie eingeloggt"

    return (
        <main className="contentGrid">
            <h2 className="flexCenter">Willkommen in deinem persönlichen Bereich!</h2>{" "}
            <div>
                Login: {lastLogin} Letzter Login: {previousLogin}
            </div>
        </main>
    )
}

export default HomePage
