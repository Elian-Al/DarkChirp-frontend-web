import styles from '../styles/ProfilePage/Profile.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import useAuthStore from '../stores/authStore';
import Posts from '../components/Posts'
import Button from '../components/UI/Button'

function Profile() {
  const [posts, setPosts] = useState([]);
  const user = useAuthStore((state) => state);

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
              width={150}
              height={150}
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
          <strong className={styles.firstname}>Mes Posts</strong>
          <strong className={styles.firstname}>Posts Likés</strong>
          <strong className={styles.firstname}>Posts Enregistrés</strong>
        </div>
        <div className={styles.displayPosts}>
          {posts.map(post => (
            <Posts
              key={post._id}
              firstname={post.user.firstname}
              createdAt={post.createdAt}
              content={post.content}
              profilePicture={post.user.profilePicture}
              postId={post._id}
              onPostDeleted={fetchPosts}
            />
          ))}
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.actionButton}>          
          <Button>Se déconnecter</Button>
          <Button>Supprimer le compte</Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
