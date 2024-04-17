const express = require("express")
const multer = require("multer")
const QRCode = require("../models/QRCode")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// QR-Code erstellen
router.post(
    "/",
    upload.single("image"),
    [
        check("text").not().isEmpty().withMessage("Text darf nicht leer sein"),
        check("action").not().isEmpty().withMessage("Action darf nicht leer sein"),
        check("image").custom((value, { req }) => {
            if (req.file) return true
            else throw new Error("Image darf nicht leer sein")
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { text, action } = req.body || {}
        const image = req.file.buffer

        try {
            const newQRCode = new QRCode({
                text,
                action: JSON.parse(action),
                image,
            })
            await newQRCode.save()
            res.status(201).json(newQRCode)
        } catch (error) {
            res.status(400).json({ message: "Fehler beim Erstellen des QR-Codes", error })
        }
    }
)

router.patch("/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params
    const { action } = req.body

    try {
        const qrCode = await QRCode.findById(id)
        if (!qrCode) {
            return res.status(404).json({ message: "QR-Code nicht gefunden." })
        }

        if (action) {
            qrCode.action = { ...qrCode.action, ...JSON.parse(action) }
        }

        await qrCode.save()
        res.status(200).json(qrCode)
    } catch (error) {
        res.status(400).json({ message: "Fehler beim Aktualisieren des QR-Codes", error })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const qrCode = await QRCode.findById(id)
        if (!qrCode) {
            return res.status(404).json({ message: "QR-Code nicht gefunden." })
        }
        res.status(200).json(qrCode)
    } catch (error) {
        res.status(500).json({ message: "Interner Serverfehler beim Abrufen des QR-Codes", error })
    }
})

module.exports = router
