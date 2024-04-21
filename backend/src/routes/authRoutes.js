require("dotenv").config()
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { sendVerificationEmail } = require("../services/emailVerification")

const router = express.Router()

const apiUrl = process.env.REACT_APP_API_URL
const jwtSecret = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Auth-Token fehlt oder ist ungültig" })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        if (typeof decoded === "object" && decoded.hasOwnProperty("userId")) {
            req.user = { userId: decoded.userId }
            next()
        } else {
            return res.status(401).json({ message: "Token ist ungültig oder manipuliert" })
        }
    } catch (error) {
        res.status(401).json({ message: "Nicht autorisiert, ungültiges Token" })
    }
}

// Registrierung
router.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verified: false, // Dieses Feld könnte zur Überprüfung des Status hinzugefügt werden
        })

        await newUser.save()

        // Generiere einen eindeutigen Verifizierungslink (oder Code)
        const verificationLink = `${apiUrl}/verify/${newUser._id}`

        // Sende die Verifizierungs-E-Mail
        await sendVerificationEmail(email, verificationLink)

        res.status(201).json({ message: "User registered. Please check your email to verify your account." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error during registration" })
    }
})

// Login
router.post("/login", async (req, res) => {
    const { emailOrUsername, password } = req.body

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Aktualisiere das previousLogin mit dem Wert von lastLogin, bevor es aktualisiert wird
        user.previousLogin = user.lastLogin
        user.lastLogin = new Date()

        await user.save()

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.json({ token, lastLogin: user.lastLogin, previousLogin: user.previousLogin })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
})

router.get("/verify/:userId", async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // @ts-ignore
        if (user.verified) {
            return res.status(400).json({ message: "User already verified" })
        }

        // @ts-ignore
        user.verified = true
        await user.save()

        res.status(200).json({ message: "User verified successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error during verification" })
    }
})

// letzter Login
router.get("/last-login/:userId", async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "Benutzer nicht gefunden" })
        }

        // Hole das letzte Element im logins-Array, das den letzten Login darstellt
        // @ts-ignore
        const lastLogin = user.logins[user.logins.length - 1]
        res.json({ lastLogin })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Serverfehler" })
    }
})

// Konto löschen
router.delete("/delete-account", authenticate, async (req, res, next) => {
    // @ts-ignore
    if (!req.user || !req.user.userId) {
        return res.status(400).json({ message: "Fehlende Benutzeridentifikation" })
    }
    try {
        // @ts-ignore
        const userId = req.user.userId
        await User.findByIdAndDelete(userId)
        res.status(200).json({ message: "Konto erfolgreich gelöscht" })
    } catch (error) {
        next(error)
    }
})

module.exports = router
