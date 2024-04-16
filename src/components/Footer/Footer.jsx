import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.contentGrid}>
            <div className={`${styles.breakout} ${styles.footerWrapper}`}>
                <ul className={styles.footerLinks}>
                    <li>
                        <a href='#impressum'>Impressum</a>
                    </li>
                    <li>
                        <a href='#datenschutz'>Datenschutz</a>
                    </li>
                    <li>
                        <a href='#agb'>AGB</a>
                    </li>
                </ul>
                <div className='social-media'>
                    <a
                        href='https://facebook.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            src='icons/facebook-icon.png'
                            alt='Facebook'
                        />
                    </a>
                    <a
                        href='https://twitter.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            src='icons/twitter-icon.png'
                            alt='Twitter'
                        />
                    </a>
                    <a
                        href='https://instagram.com'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            src='icons/instagram-icon.png'
                            alt='Instagram'
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
