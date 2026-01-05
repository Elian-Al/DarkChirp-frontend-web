import { useState } from 'react';
import styles from '../styles/LoginPage/Login.module.css';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Button from '../components/UI/Button'
import AuthModal from './auth/AuthModal'

function Login() {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signin');

    const redirectHome = () => {
        router.push('/Home')
    };

    const handleOpenModal = (mode) => {
      console.log(`${mode} clicked`);
      
      setAuthMode(mode);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };


  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <Image
          src='/favicon.ico.png'
          width={250}
          height={250}
          alt="DarkChirp Logo"          
        />       
      </div>
      <div className={styles.rightSide}>
        <div className={styles.loginContainer}>
          <h2>Rejoignez Dark Chirp aujourd'hui.</h2>
          <h5>Le futur du micro-blogging.</h5>

          <Button onClick={() => handleOpenModal('signup')}>S'inscrire</Button>

          <p>Vous avez déjà un compte ?</p>

          <Button onClick={() => handleOpenModal('signin')}>Se connecter</Button>
        </div>
        <div className={styles.redirectHome}>
            <Button onClick={redirectHome}>Home</Button>
        </div>
      </div>
      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={authMode}
        onSwitchMode = {setAuthMode}
      />
    </div>
  );
}

export default Login;
