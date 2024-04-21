import React from "react"
import { Link } from "react-router-dom"

import styles from "./Header.module.scss"
import PopupMenu from "components/PopupMenu/PopupMenu"

const Header = () => {
    return (
        <header className="fullWidth">
            <Link to={"/"}>
                <img src="logo.png" alt="Logo" className={styles.logo} />
            </Link>
            <h1>Qr-Code-Project</h1>
            <PopupMenu />
        </header>
    )
}

export default Header
