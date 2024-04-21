import axios from "axios"

const baseURL = process.env.REACT_APP_API_BASE_URL_AUTH

export const register = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}register`, userData)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const login = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}login`, userData)
        const { data } = response
        if (data.token) {
            // Speichert Token und Login-Zeiten im Local Storage
            const userSession = {
                token: data.token,
                lastLogin: data.lastLogin, // Zeitpunkt des vorherigen Logins
                previousLogin: data.previousLogin, // Zeitpunkt des Logins davor
            }
            localStorage.setItem("user", JSON.stringify(userSession))
        }
        return data
    } catch (error) {
        console.error("Login failed:", error.response.data)
        throw error.response.data
    }
}

export const deleteAccount = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await axios.delete(`${baseURL}delete-account`, config)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const logout = () => {
    localStorage.removeItem("user")
}
