import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from '../../styles/LoginPage/AuthModal.module.css'

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }) => {
    if (!isOpen) {
        return null;
    }

    const FormComponent = mode === 'signin' ? SignInForm : SignUpForm;

    const toggleMode = () => {
        onSwitchMode(mode === 'signin' ? 'signup' : 'signin');
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <FormComponent
                    toggleMode={toggleMode}
                    onSuccess={onClose}
                    className={styles.form}
                />
            </div>
        </div>
    );
};

export default AuthModal;