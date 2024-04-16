import React from "react"
import QRCodeGenerator from "components/QrCodeGenerator/QrCodeGenerator"
import styles from "./QrCodePage.module.scss"

function QrCodePage() {
    return (
        <main className={styles.contentGrid}>
            <div className={styles.qrCodePage}>
                <QRCodeGenerator />
            </div>
        </main>
    )
}

export default QrCodePage
