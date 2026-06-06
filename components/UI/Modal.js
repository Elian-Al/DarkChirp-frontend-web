import styles from "../../styles/UI/Modal.module.css";
import { useState } from "react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, submitDeleteAccount, children, ...props }) => {
    const [password, setPassword] = useState("");

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
