import React from "react"
import { Link } from "react-router-dom"

import Icons from "components/Icons/Icons"

import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <footer className="fullWidth">
            <ul className={styles.footerLinks}>
                <li className="hover">
                    <Link to="/impressum">Impressum</Link>
                </li>
                <li className="hover">
                    <Link to="/datenschutz">Datenschutz</Link>
                </li>
                <li className="hover">
                    <Link to="/agb">AGB</Link>
                </li>
            </ul>
            <div className={styles.footerLinksWrapper}>
                <div className={styles.footerLinks}>
                    <a href="mailto:mail@hoffmann-niklas.de" target="_blank" rel="noopener noreferrer">
                        <Icons iconName={"E-Mail"}></Icons>
                    </a>
                    <a href="https://wa.me/+4915156593771" target="_blank" rel="noopener noreferrer">
                        <Icons iconName={"Whatsapp"}></Icons>{" "}
                    </a>
                </div>
                <div className={styles.footerLinks}>
                    <a href="tel:+4915156593771">
                        <Icons iconName={"Phone"}></Icons>{" "}
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Icons iconName={"Facebook"}></Icons>{" "}
                    </a>
                </div>
                <div className={styles.footerLinks}>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Icons iconName={"Twitter"}></Icons>{" "}
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Icons iconName={"Instagram"}></Icons>{" "}
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
