import React from "react"

import styles from "./Btn.module.scss"

const Btn = ({ buttonText, onClickAction, type = "button", style }) => {
    return (
        <div className={styles.BtnWrapper}>
            <button className={styles.btn} onClick={onClickAction} type={type} style={style}>
                {buttonText}
            </button>
        </div>
    )
}

export default Btn
