import { useState } from 'react';
import { signUp } from '../../services/authService';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from '../../styles/LoginPage/SignUpForm.module.css';

const SignUpForm = ({ toggleMode }) => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const result = await signUp({ username, firstname, lastname, password });

        if (result.success) {
            setSuccess('Inscription réussie ! Veuillez vous connecter.');
            setTimeout(toggleMode, 1500);
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Créer un compte</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Input type='text' placeholder='Prénom' value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            <Input type='text' placeholder='Nom' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            <Input type='text' placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Button type='submit' disabled={isLoading || success}>
                {isLoading ? 'Inscription en cours...' : "S'inscrire"}
            </Button>

            <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                Vous avez déja un compte ?
                <a onClick={toggleMode} style={{ cursor: 'pointer', color: '#1a89f7', marginLeft: '5px' }}>
                    Se connecter ici
                </a>
            </p>
        </form>
    );
};

export default SignUpForm;