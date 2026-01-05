import styles from '../styles/HomePage/Home.module.css';
import { useEffect, useState } from 'react';
import { postService } from '../services/postService';
import Posts from '../components/Posts'
import NewPost from '../components/newPost'
import ProfileCard from './ProfileCard';
import Image from 'next/image'
import useAuthStore from '../stores/authStore';

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useAuthStore((state) => state);

  const fetchPosts = async () => {
    const data = await postService.getAllPosts();
    setPosts(data.data);
    console.log('posts :', data);      
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.leftPart}>
        <div className={styles.logoPart}>
          <Image
            src='/favicon.ico.png'
            width={70}
            height={70}
            alt="DarkChirp Logo"
          />
        </div>
        <div className={styles.profilePart}>
          <ProfileCard profilePicture={user.profilePicture} firstname={user.firstname} username={user.username} />
        </div>
      </div>
      <div className={styles.postsPart}>
        <h5 className={styles.title}>Home</h5>
        <div className={styles.newPost}>
          <NewPost onPostCreated={fetchPosts} />
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
        Trend
      </div>
    </div>
  );
}

export default Home;
