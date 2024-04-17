import { createQRCodeStatus, updateQRCodeStatus } from "../services/qrCodeService" // Importieren der Service-Funktionen

const useQRCodeActions = () => {
    const createOrUpdateQRCode = async (text, action, imageData, id = null) => {
        try {
            let data
            if (id) {
                // Aktualisieren eines bestehenden QR-Codes
                data = await updateQRCodeStatus(id, action)
            } else {
                // Erstellen eines neuen QR-Codes
                data = await createQRCodeStatus(text, action, imageData)
            }

            return data
        } catch (err) {
            throw err
        }
    }

    return {
        createOrUpdateQRCode,
    }
}

export default useQRCodeActions
