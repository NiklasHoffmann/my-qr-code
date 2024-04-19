import React, { useState } from "react"
import { Link } from "react-router-dom"

import styles from "./PopupMenu.module.scss"

const PopupMenu = () => {
    const buttonContent = "burgerIcon"

    const [isOpen, setIsOpen] = useState(false)

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
                    <li>
                        <Link className={styles.links} to="/">
                            Startseite
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/about">
                            Über mich
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/qrcode">
                            QrCode
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/pictures">
                            Pictures
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/code">
                            Code
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/more">
                            More
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.links} to="/stuff">
                            Stuff
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PopupMenu
