import styles from '../styles/ProfilePage/Profile.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { postService } from '../services/postService';
import useAuthStore from '../stores/authStore';
import { useRouter } from 'next/router';
import Posts from '../components/Posts';
import Button from '../components/UI/Button';
import ConfirmModal from './ConfirmModal';

function Profile() {
  const [activeTab, setActiveTab] = useState('mine');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const limit = 10;
  const user = useAuthStore((state) => state);
  const token = user.token;
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  // if (!token) {router.push('/')};

  const fetchUserPosts = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const data = await postService.getUserPosts({token, tab: activeTab, skip, limit});
      
      console.log('data :', data);      
  
      if (data.success) {
        setPosts(prevPosts => [...prevPosts, ...data.result.data]);
        setSkip(data.result.data.length);
      };
    } finally {
      setIsLoading(false);
    };
  };

  const handleTabChange = (tabSet) => {
    setPosts([]);
    setSkip(0);
    setActiveTab(tabSet);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserPosts();
  }, [activeTab]);

  return (
    <div className={styles.main}>
      <div className={styles.leftPart}>
        <div className={styles.logoPart}>
            <Link href='/Home' className={styles.logoLink}>
                <Image
                  src='/favicon.ico.png'
                  width={70}
                  height={70}
                  alt="DarkChirp Logo"          
                />
            </Link>
        </div>        
      </div>
      <div className={styles.userPart}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <Image          
              src={user.profilePicture || '/Default-Avatar.svg'}
              width={130}
              height={130}
              alt="User Avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.name}>            
            <strong className={styles.firstname}>{user.firstname}</strong>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>
        <div className={styles.postPart}>
          <strong className={activeTab === 'mine' ? styles.active : ''} onClick={() => handleTabChange('mine')}>Mes Posts</strong>
          <strong className={activeTab === 'liked' ? styles.active : ''} onClick={() => handleTabChange('liked')}>Posts Likés</strong>
          <strong className={activeTab === 'saved' ? styles.active : ''} onClick={() => handleTabChange('saved')}>Posts Enregistrés</strong>
        </div>
        <div className={styles.displayPosts}>
          <p className={styles.postsNumber}>{posts.length} posts affichés</p>
          {posts.map(post => (
            <Posts
              key={post._id}
              firstname={post.user.firstname}
              createdAt={post.createdAt}
              content={post.content}
              profilePicture={post.user.profilePicture}
              postId={post._id}
              onPostDeleted={fetchUserPosts}
            />
          ))}
          <Button onClick={fetchUserPosts}>Charger plus de posts</Button>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.actionButton}>          
          <Button onClick={handleLogout}>Se déconnecter</Button>
          <Button onClick={handleOpenModal}>Supprimer le compte</Button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Profile;
