import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.scss"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.contentGrid}>
            <div className={`${styles.breakout} ${styles.headerWrapper}`}>
                <img src="logo.png" alt="Logo" className={styles.logo} />
                <h1>Meine Website</h1>
                <nav>
                    <ul className={`${styles.menu} ${isOpen ? "open" : ""}`}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">Über mich</Link>
                        </li>
                        <li>
                            <Link to="/qrcode">QrCode generieren</Link>
                        </li>
                    </ul>
                    <button className={styles.burgerMenu} onClick={toggleMenu}>
                        ☰
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
