import React from "react"

import styles from "./MenuBtn.module.scss"

const MenuBtn = ({ buttonContent, onClickAction, type, isOpen }) => {
    return (
        <button
            className={`${styles.menuBtn} ${isOpen ? styles.open : ""}`}
            onClick={onClickAction}
        >
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
    )
}

export default MenuBtn
