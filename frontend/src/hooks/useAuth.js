import { useState, useEffect, useContext, createContext } from "react"
import * as authService from "services/authService" // Pfad zur authService-Datei anpassen

const authContext = createContext()

// Provider-Komponente, die den Context für untergeordnete Komponenten zur Verfügung stellt
export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook zum Zugriff auf den Auth-Context
export const useAuth = () => {
    return useContext(authContext)
}

// Provider Hook, der die Logik für das Erstellen, Einloggen und Löschen von Konten enthält
function useProvideAuth() {
    const [user, setUser] = useState(null)

    // Überprüfen, ob der Benutzer beim Starten der App eingeloggt ist
    useEffect(() => {
        const loadedUser = localStorage.getItem("user")
        if (loadedUser) {
            const userData = JSON.parse(loadedUser)
            setUser(userData)
        }
    }, [])

    const register = async (userData) => {
        try {
            const response = await authService.register(userData)
            setUser(response)
            localStorage.setItem("user", JSON.stringify(response))
            return response
        } catch (error) {
            throw error
        }
    }

    const login = async (userData) => {
        try {
            const response = await authService.login(userData)
            if (response.token) {
                const userDataWithLogins = {
                    ...response,
                    lastLogin: response.lastLogin, // Vom Server bereitgestellt
                    previousLogin: response.previousLogin, // Vom Server bereitgestellt
                }
                setUser(userDataWithLogins)
                localStorage.setItem("user", JSON.stringify(userDataWithLogins))
                return userDataWithLogins
            }
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        }
    }

    const deleteAccount = async () => {
        if (user && user.token) {
            try {
                await authService.deleteAccount(user.token)
                logout()
            } catch (error) {
                console.error("Delete account failed:", error)
                throw error
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    const getLastLogin = () => {
        return user ? user.lastLogin : null
    }

    return {
        user,
        register,
        login,
        deleteAccount,
        logout,
        getLastLogin,
    }
}
