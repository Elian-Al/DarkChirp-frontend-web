import styles from "../../styles/ProfilePage/AccountDeletion.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

const AccountDeletion = ({ isOpen, onClose, submitDeleteAccount }) => {
    const [password, setPassword] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.title}>
                <h4>Veuillez entrer votre mot de passe pour confirmer la suppression du compte :</h4>
            </div>
            <form>
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
            </form>
            <div className={styles.actionButton}>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={() => submitDeleteAccount(password)}>Confirmer</Button>
            </div>
        </Modal>
    );
};

export default AccountDeletion;
