import { useState} from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../../services/authService';
import useAuthStore from '../../stores/authStore';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from '../../styles/LoginPage/SignInForm.module.css';

const SignInForm = ({ toggleMode, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await signIn({ username, password });

        if (result.success) {
            login(result.token, { username: result.username})
            onSuccess();
            router.push('/home');
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Se connecter</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Input
                type='text'
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <Input
                type='password'
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>

            <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                Pas encore de compte ? 
                <a onClick={toggleMode} style={{ cursor: 'pointer', color: '#1a89f7', marginLeft: '5px' }}>
                    S'inscrire ici
                </a>
            </p>
        </form>
    )
};

export default SignInForm;