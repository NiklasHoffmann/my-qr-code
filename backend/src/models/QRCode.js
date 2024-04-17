const mongoose = require("mongoose")

const qrCodeSchema = new mongoose.Schema({
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
    action: {
        downloaded: Boolean,
        printed: Boolean,
        shared: Boolean,
    },
    image: {
        type: Buffer,
    },
})

const QRCode = mongoose.model("QRCode", qrCodeSchema)

module.exports = QRCode
