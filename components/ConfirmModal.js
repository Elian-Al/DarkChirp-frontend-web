import styles from '../styles/ProfilePage/ConfirmModal.module.css'
import { useState } from 'react';
import Button from '../components/UI/Button'
import Input from './UI/Input';

const ConfirmModal = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState('');

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <div className={styles.title}>
                    <h5>Veuillez entrer votre mot de passe pour confirmer la suppression du compte :</h5>
                </div>
                <Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <div className={styles.actionButton}>
                    <Button onClick={onClose}>Annuler</Button>
                    <Button>Confirmer</Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;