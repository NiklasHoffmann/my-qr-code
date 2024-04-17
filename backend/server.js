require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const qrCodeRoutes = require("./src/routes/qrCodeRoutes")

const app = express()
const mongoUri = process.env.MONGODB_URI
const apiBaseUrl = process.env.REACT_APP_API_URL || ""

// Verbindung zu MongoDB
mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.log(err))

// Middleware
app.use(cors({ origin: apiBaseUrl }))
app.use(express.json())

// QR Code Routen
app.use("/api/qrcodes", qrCodeRoutes)

// Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error(err.stack)
    if (res.headersSent) {
        return next(err)
    }
    const status = err.status || 500
    const message = err.message || "Etwas ist schief gelaufen!"
    res.status(status).send({ error: message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`))
