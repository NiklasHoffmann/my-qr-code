import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "pages/HomePage"
import AboutPage from "pages/AboutPage"
import QrCodePage from "pages/QrCodePage"
import ImpressumPage from "pages/ImpressumPage"
import LoginPage from "pages/LoginPage"
import MySpacePage from "pages/MySpacePage"
import LogoutPage from "pages/LogoutPage"
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"

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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route
                            path="/myspace"
                            element={
                                <ProtectedRoute>
                                    <MySpacePage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer className={styles.footer} />
            </div>
        </Router>
    )
}

export default App
