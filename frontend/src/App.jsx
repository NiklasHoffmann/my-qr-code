import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "pages/Home/HomePage"
import AboutPage from "pages/About/AboutPage"
import QrCodePage from "pages/QrCode/QrCodePage"
import ImpressumPage from "pages/Impressum/ImpressumPage"

import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"

import styles from "./App.module.scss"

function App() {
    return (
        <Router>
            <div className={styles.appContainer}>
                <Header className={styles.header} />
                <div className={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/qrcode" element={<QrCodePage />} />
                        <Route path="/impressum" element={<ImpressumPage />} />
                    </Routes>
                </div>
                <Footer className={styles.footer} />
            </div>
        </Router>
    )
}

export default App
