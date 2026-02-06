import styles from '../styles/HomePage/Home.module.css';
import { useEffect, useState } from 'react';
import { postService } from '../services/postService';
import Posts from '../components/Posts';
import NewPost from '../components/newPost';
import Tags from '../components/tag';
import ProfileCard from './ProfileCard';
import Image from 'next/image'
import useAuthStore from '../stores/authStore';

function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const user = useAuthStore((state) => state);

  const fetchPosts = async () => {
    const data = await postService.getAllPosts();
    setPosts(data.data);
    
    const tagsList = await postService.getTrendingHashtag();
    setTags(tagsList.data)
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
            priority
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
          {posts.map(post => {
            const isLike = user.likedPosts?.includes(post._id)
            const isSave = user.savedPosts?.includes(post._id)

            return (
              <Posts
                key={post._id}
                firstname={post.user.firstname}
                createdAt={post.createdAt}
                content={post.content}
                profilePicture={post.user.profilePicture}
                postId={post._id}
                onPostDeleted={fetchPosts}
                isLike={isLike}
                isSave={isSave}
                likeNbr={post.likes.length < 1000 ? `${post.likes.length}` : `${post.likes.length}k`}
                saveNbr={post.saved.length < 1000 ? `${post.saved.length}` : `${post.saved.length}k`}
              />
            )
          })}
        </div>
      </div>
      <div className={styles.rightPart}>
        Trending Hashtag
        <div className={styles.tags}>
          {tags.map(tag => {
            return (
              <Tags
                key={tag._id}
                name={tag.name}
                count={tag.count}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
