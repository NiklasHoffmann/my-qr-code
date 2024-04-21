import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./LoginForm.module.scss"
import Btn from "components/Btns/Btn"
import { useAuth } from "hooks/useAuth"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const { login, register } = useAuth()
    const navigate = useNavigate()

    const handleFormSubmit = async (event) => {
        event.preventDefault() // Verhindert das Neuladen der Seite
        if (isRegistering) {
            try {
                await register({ username, email, password })
                navigate("/myspace")
            } catch (error) {
                console.error("Registration failed:", error)
            }
        } else {
            try {
                await login({ emailOrUsername: username, password })
                navigate("/myspace")
            } catch (error) {
                console.error("Login failed:", error.message)
            }
        }
    }

    return (
        <div className={styles.loginFormWrapper}>
            <form onSubmit={handleFormSubmit} id="loginForm">
                {isRegistering && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Benutzername"
                        suggested="current-username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <input
                    type={isRegistering ? "email" : "username"}
                    name={isRegistering ? "email" : "username"}
                    placeholder={isRegistering ? "E-mail" : "E-mail oder Benutzername"}
                    suggested={`${"current-"} ${isRegistering ? "email" : "username"}`}
                    value={isRegistering ? email : username}
                    required
                    onChange={(e) => (isRegistering ? setEmail(e.target.value) : setUsername(e.target.value))}
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    suggested="current-password"
                    minLength={8}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <Btn
                buttonText={isRegistering ? "Registrieren" : "Login"}
                type="submit"
                form="loginForm"
                customStyle={"success"}
                value="Submit"
            />
            <div className={styles.options}>
                {!isRegistering ? (
                    <>
                        <p onClick={() => setIsRegistering(true)}>Registrieren</p>
                        <p>Passwort vergessen?</p>
                    </>
                ) : (
                    <p onClick={() => setIsRegistering(false)}>Zurück zum Login</p>
                )}
            </div>
        </div>
    )
}

export default LoginForm
