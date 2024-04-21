import React from "react"
import QRCodeGenerator from "components/QrCodeGenerator/QrCodeGenerator"

function QrCodePage() {
    return (
        <main className="contentGrid">
            <div className="flexCenter">
                <QRCodeGenerator />
            </div>
        </main>
    )
}

export default QrCodePage
