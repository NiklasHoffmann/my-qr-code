// qrCodeService.js
const baseURL = process.env.REACT_APP_API_BASE_URL_QRCODE

function base64ToBlob(base64, mimeType) {
    // Achten Sie darauf, das Format korrekt zu handhaben, insbesondere wenn Ihr Base64-String einen Data-URI-Prefix enthält
    const base64WithoutPrefix = base64.split(",")[1] // Entfernt den Data-URI-Teil, falls vorhanden
    const byteCharacters = atob(base64WithoutPrefix) // Dekodieren des Base64 Strings
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
}

export const createQRCodeStatus = async (text, action, imageData) => {
    const formData = new FormData()

    // Überprüfen Sie hier, ob imageData tatsächlich ein String und ein gültiger Base64 ist
    if (typeof imageData === "string" && imageData.startsWith("data:image")) {
        const imageBlob = base64ToBlob(imageData, "image/png") // Konvertieren zu Blob
        formData.append("image", imageBlob, `${text}.png`)
    } else {
        console.error("Invalid image data")
    }

    formData.append("text", text)
    formData.append("action", JSON.stringify(action))

    try {
        const response = await fetch(`${baseURL}`, {
            method: "POST",
            body: formData, // Keine 'Content-Type' Header nötig
        })

        if (!response.ok) {
            const errorBody = await response.json() // Nimmt an, dass der Server JSON-Fehlerdetails sendet
            throw new Error(`HTTP error ${response.status}: ${errorBody.message}`)
        }

        const qrCode = await response.json()
        return qrCode._id
    } catch (err) {
        console.error("Failed to update QR Code:", err)
        throw err
    }
}

export const updateQRCodeStatus = async (id, action) => {
    const url = `${baseURL}/${id}`
    const formData = new FormData()
    formData.append("action", JSON.stringify(action))
    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: formData,
        })

        if (!response.ok) {
            const errorBody = await response.json()
            throw new Error(`HTTP error ${response.status}: ${errorBody.message}`)
        }

        return await response.json()
    } catch (err) {
        console.error("Failed to update QR Code:", err)
        throw err
    }
}

export const getQRCodeById = async (id) => {
    const url = `${baseURL}/${id}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${await response.text()}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Failed to fetch QR Code:", error)
        throw error
    }
}
