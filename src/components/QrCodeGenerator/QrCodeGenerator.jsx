import React, { useState, useRef } from "react"
import QRCode from "qrcode.react"
import { useDropzone } from "react-dropzone"

import Btn from "../Btn/Btn"

import styles from "./QrCodeGenerator.module.scss"

const QRCodeGenerator = () => {
    const qrRef = useRef(null)
    const [inputText, setInputText] = useState("")
    const [icon, setIcon] = useState("")
    const [iconSize, setIconSize] = useState(24)
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M")

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
    const saveQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = "qrcode.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const printQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas")
        const image = canvas.toDataURL("image/png")
        const windowPrint = window.open("")
        windowPrint.document.write(
            `<img src="${image}" onload="window.focus(); window.print(); window.close();"/>`
        )
        windowPrint.document.close()
    }

    const shareQRCode = () => {
        // Dieser Platzhalter kann durch eine Implementierung ersetzt werden, um den QR-Code über Social Media oder E-Mail zu teilen
        console.log("Teilen-Funktionalität noch zu implementieren")
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
                </div>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                    placeholder="Gib einen Text ein für QR Code"
                    className={styles.input}
                />
                <input
                    type="range"
                    min="10"
                    max="60"
                    value={iconSize}
                    onChange={handleSizeChange}
                    className={styles.slider}
                />
            </div>
            <div className={styles.qrCodeOptions}>
                <Btn onClickAction={saveQRCode} buttonText={"QR-Code speichern"} />
                <Btn onClickAction={printQRCode} buttonText={"QR-Code drucken"} />
                <Btn onClickAction={shareQRCode} buttonText={"QR-Code teilen"} />
            </div>
        </div>
    )
}

export default QRCodeGenerator
