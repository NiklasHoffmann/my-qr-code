import React, { useState, useRef, useEffect } from "react"
import QRCode from "qrcode.react"
import { useDropzone } from "react-dropzone"

import useQrCodeActions from "hooks/useQrCodeActions"
import { getQRCodeById } from "services/qrCodeService"
import Btn from "../Btns/Btn"

import styles from "./QrCodeGenerator.module.scss"

const QRCodeGenerator = () => {
    const qrRef = useRef(null)
    const [inputText, setInputText] = useState("")
    const [icon, setIcon] = useState("")
    const [iconSize, setIconSize] = useState(24)
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M")
    const [qrCodeId, setQrCodeId] = useState(null)

    const { createOrUpdateQRCode } = useQrCodeActions()

    useEffect(() => {
        setQrCodeId(null)
    }, [inputText, icon, iconSize, errorCorrectionLevel])

    const handleChange = (event) => {
        setInputText(event.target.value)
    }

    const handleSizeChange = (event) => {
        const newSize = Number(event.target.value)
        setIconSize(newSize)
        adjustErrorCorrectionLevel(newSize)
    }

    const adjustErrorCorrectionLevel = (size) => {
        if (size <= 20) {
            setErrorCorrectionLevel("M")
        } else if (size <= 30) {
            setErrorCorrectionLevel("Q")
        } else {
            setErrorCorrectionLevel("H")
        }
    }

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        const reader = new FileReader()

        reader.onload = () => {
            setIcon(reader.result)
        }

        reader.readAsDataURL(file)
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" })

    const handleQRCodeAction = async (actionType) => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        let actionUpdate = { [actionType]: true }

        if (!qrCodeId) {
            // Wenn noch keine QR-Code ID vorhanden ist, erstellen Sie den QR-Code mit der initialen Aktion
            try {
                const id = await createOrUpdateQRCode(inputText, { ...actionUpdate }, image)
                setQrCodeId(id)
            } catch (error) {
                console.error(`Failed to create QR Code with initial action '${actionType}'`, error)
            }
        } else {
            try {
                const currentData = await getQRCodeById(qrCodeId) // Funktion zum Abrufen des aktuellen QR-Codes
                const currentActions = currentData.action || {}
                const updatedActions = { ...currentActions, ...actionUpdate }
                await createOrUpdateQRCode(inputText, updatedActions, image, qrCodeId)
            } catch (error) {
                console.error(`Failed to update QR Code with new action '${actionType}'`, error)
            }
        }
    }

    const saveQRCode = async () => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = "qrcode.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        handleQRCodeAction("downloaded")
    }

    const printQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        const windowPrint = window.open("")
        windowPrint.document.write(`<img src="${image}" onload="window.focus(); window.print(); window.close();"/>`)
        windowPrint.document.close()
        handleQRCodeAction("printed")
    }

    const shareQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        // Dieser Platzhalter kann durch eine Implementierung ersetzt werden, um den QR-Code über Social Media oder E-Mail zu teilen
        console.log("Teilen-Funktionalität noch zu implementieren")
        handleQRCodeAction("shared")
    }

    const clearIcon = () => {
        setIcon("")
    }

    return (
        <div className={styles.qrCodeWrapper}>
            <div ref={qrRef}>
                <QRCode
                    className={styles.qrCode}
                    value={inputText || "https://example.com"}
                    size={256}
                    level={errorCorrectionLevel}
                    includeMargin={true}
                    imageSettings={{
                        src: icon,
                        height: iconSize,
                        width: iconSize,
                        excavate: true,
                    }}
                />
            </div>
            <div className={styles.qrCodeInput}>
                <div className={styles.dropZone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                        Ziehe ein Icon hierher <br /> oder klicke, um ein Bild auszuwählen
                    </p>
                </div>{" "}
                <input
                    type="range"
                    min="10"
                    max="60"
                    value={iconSize}
                    onChange={handleSizeChange}
                    className={styles.slider}
                />
                <Btn onClickAction={clearIcon} buttonText={"Bild löschen"} customStyle={"danger"} />
                <input
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Gib einen Text ein für deinen QR Code"
                    className={styles.input}
                />
            </div>
            <div className={styles.qrCodeOptions}>
                <Btn onClickAction={saveQRCode} buttonText={"QR-Code herunterladen"} customStyle={"success"} />
                <Btn onClickAction={printQRCode} buttonText={"QR-Code drucken"} customStyle={"success"} />
                <Btn onClickAction={shareQRCode} buttonText={"QR-Code teilen"} customStyle={"success"} />
            </div>
        </div>
    )
}

export default QRCodeGenerator
