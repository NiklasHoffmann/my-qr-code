import React from "react"

import styles from "./Btn.module.scss"

const Btn = ({ type, form, value, buttonText, customStyle, onClickAction, children }) => {
    return (
        <div className={styles.BtnWrapper}>
            <button
                type={type}
                form={form}
                value={value}
                className={`${styles.btn} ${styles[customStyle]}`}
                onClick={onClickAction}
            >
                {buttonText}
                {children}
            </button>
        </div>
    )
}

export default Btn
