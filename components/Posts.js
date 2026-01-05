import styles from '../styles/HomePage/Posts.module.css'
import Image from 'next/image'
import { FaTrashAlt, FaBookmark, FaRegHeart, FaHeart } from "react-icons/fa";
import { postService } from '../services/postService';
import useAuthStore from '../stores/authStore';
import { useState } from 'react';

const Posts = ({profilePicture, firstname, createdAt, content, postId, onPostDeleted}) => {
    const [isLoading, setIsLoading] = useState(false);
    const token = useAuthStore((state) => state.token);

    const action_type = {
        like: 'like',
        save: 'save'
    }

    // const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
    const handleInteractPost = async ({ type }) => {

        setIsLoading(true);

        const result = await postService.interactPost(postId, token, type)

        if (result.success) {
            // if (onPostDeleted) onPostDeleted();
            console.log(`Post ${type} avec succés.'`);
            
        } else {
            alert(`Erreur lors du ${type} du post :` + result.message);
        }
        setIsLoading(false);
    }
    
    const handleDeletePost = async () => {

        setIsLoading(true);

        const result = await postService.deletePost(postId, token)

        if (result.success) {
            if (onPostDeleted) onPostDeleted();
        } else {
            alert('Erreur lors de la suppression du post :' + result.message);
        }
        setIsLoading(false);
    }
    
    return (
        <div className={styles.post}>
            <div className={styles.postAuthor}>
                {profilePicture && <Image
                    src={profilePicture}
                    width={50}
                    height={50}
                    alt="Profile Picture"
                    className={styles.responsiveLogo}
                />}
                <strong className={styles.firstname}>{firstname}</strong>
                <p className={styles.publicationTime}>{createdAt}</p>
            </div>
            <div className={styles.postContent}>
                <p>{content}</p>
            </div>
            <div className={styles.postAction}>
                <FaRegHeart onClick={() => handleInteractPost({type: action_type.like})}/>
                <FaBookmark onClick={() => handleInteractPost({type: action_type.save})}/>
                <FaTrashAlt onClick={handleDeletePost} color={isLoading ? 'red' : 'white'}/>
            </div>
        </div>
    )
}

export default Posts;