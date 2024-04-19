import React from "react"

import styles from "./Btn.module.scss"

const Btn = ({ buttonText, onClickAction, type, children }) => {
    return (
        <div className={styles.BtnWrapper}>
            <button className={`${styles.btn} ${styles[type]}`} onClick={onClickAction}>
                {buttonText}
                {children}
            </button>
        </div>
    )
}

export default Btn
