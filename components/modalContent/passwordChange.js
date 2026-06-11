import styles from "../../styles/ProfilePage/PasswordChange.module.css";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

const PasswordChange = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelClick = () => {
    setCurrentPassword("");
    setNewPassword("");
    onClose();
  };

  const handleSubmit = async () => {
    console.log("Confirm Clicked !");

    // setIsLoading(true);
    // setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.title}>
        <h4>Veuillez entrer votre mot de passe actuel puis votre nouveau mot de passe :</h4>
      </div>
      <form className={styles.passwordInput}>
        <Input
          type="password"
          placeholder="Mot de passe actuel"
          value={currentPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Input
          type="password"
          placeholder="Nouveau Mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </form>
      <div className={styles.actionButton}>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit}>Confirmer</Button>
      </div>
    </Modal>
  );
};

export default PasswordChange;
