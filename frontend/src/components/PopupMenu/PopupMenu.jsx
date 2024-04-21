import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "hooks/useAuth"

import styles from "./PopupMenu.module.scss"

const PopupMenu = () => {
    const buttonContent = "burgerIcon"

    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const toggleMenu = (event) => {
        event.stopPropagation()
        setIsOpen(!isOpen)
    }

    const handleMouseEnter = (event) => {
        if (!event.touches) {
            setIsOpen(true)
        }
    }

    const handleMouseLeave = (event) => {
        if (!event.touches) {
            setIsOpen(false)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
        navigate("/logout")
    }

    return (
        <div
            onTouchEnd={toggleMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${styles.popupMenuWrapper} ${isOpen ? styles.open : ""}`}
            aria-expanded={isOpen}
        >
            <button className={styles.menuBtn}>
                <div className={`${styles[`${buttonContent}Wrapper`]}`}>
                    <div className={styles[buttonContent]}>
                        {buttonContent === "burgerIcon" && (
                            <>
                                <div className={styles.burgerLine}></div>
                                <div className={styles.burgerLine}></div>
                                <div className={styles.burgerLine}></div>
                            </>
                        )}
                    </div>
                </div>
            </button>
            <div className={styles.popupMenu}>
                <ul>
                    <li className="hover">
                        <Link className={styles.links} to="/">
                            Startseite
                        </Link>
                    </li>
                    <li className="hover">
                        <Link className={styles.links} to="/about">
                            Über mich
                        </Link>
                    </li>
                    <li className="hover">
                        <Link className={styles.links} to="/qrcode">
                            QrCode
                        </Link>
                    </li>
                    <li className="hover">
                        <Link className={styles.links} to="/pictures">
                            Pictures
                        </Link>
                    </li>
                    <li className="hover">
                        <Link className={styles.links} to="/code">
                            Code
                        </Link>
                    </li>
                    {user ? (
                        <li className="hover">
                            <Link className={styles.links} to="/myspace">
                                Mein Bereich
                            </Link>
                        </li>
                    ) : null}

                    <li className="hover">
                        <Link
                            className={styles.links}
                            to={user ? "/logout" : "/login"}
                            onClick={user ? handleLogout : null}
                        >
                            {user ? "Logout" : "Login"}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PopupMenu
