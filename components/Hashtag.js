import styles from "../styles/HomePage/Hashtag.module.css";
import { useEffect, useState } from "react";
import { postService } from "../services/postService";
import Posts from "../components/Posts";
import NewPost from "../components/newPost";
import Tags from "../components/tag";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "../stores/authStore";

function Hashtag({ name }) {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const user = useAuthStore((state) => state);
  const hydrate = useAuthStore((state) => state.hydrate);

  const fetchPosts = async () => {
    if (!name) return;

    const data = await postService.getPostsByHashtag(name);
    setPosts(data.data);

    const tagsList = await postService.getTrendingHashtag();
    setTags(tagsList.data);

    hydrate();
  };

  useEffect(() => {
    fetchPosts();
  }, [name]);

  return (
    <div className={styles.main}>
      <div className={styles.leftPart}>
        <div className={styles.logoPart}>
          <Link href="/Home" className={styles.logoLink}>
            <Image src="/favicon.ico.png" width={70} height={70} alt="DarkChirp Logo" priority />
          </Link>
        </div>
        <div className={styles.profilePart}>
          <ProfileCard
            profilePicture={user.profilePicture}
            firstname={user.firstname}
            username={user.username}
          />
        </div>
      </div>
      <div className={styles.postsPart}>
        <h5 className={styles.title}>Hashtag</h5>
        <div className={styles.hashtagNameContainer}>
          <h2 className={styles.hashtagName}>#{name}</h2>
        </div>
        <div className={styles.displayPosts}>
          {posts.map((post) => {
            const isLike = user.likedPosts?.includes(post._id);
            const isSave = user.savedPosts?.includes(post._id);

            return (
              <Posts
                key={post._id}
                firstname={post.user.firstname}
                createdAt={post.createdAt}
                content={post.content}
                profilePicture={post.user.profilePicture}
                postId={post._id}
                onPostInteraction={fetchPosts}
                isLike={isLike}
                isSave={isSave}
                likeNbr={
                  post.likes.length < 1000 ? `${post.likes.length}` : `${post.likes.length}k`
                }
                saveNbr={
                  post.saved.length < 1000 ? `${post.saved.length}` : `${post.saved.length}k`
                }
                isAuthor={post.user.username === user.username ? true : false}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.rightPart}>
        Trending Hashtag
        <div className={styles.tags}>
          {tags.map((tag) => {
            return <Tags key={tag._id} name={tag.name} count={tag.count} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Hashtag;
