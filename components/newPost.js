import { useState } from 'react';
import styles from '../styles/HomePage/newPost.module.css'
import { postService } from '../services/postService';
import useAuthStore from '../stores/authStore';
import Input from '../components/UI/Input';
import Button from './UI/Button';

const NewPost = ({ onPostCreated }) => {
    const [postContent, setPostContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = useAuthStore((state) => state.token);
    

    // const token = localStorage.getItem('token');

    const charLimit = 280;

    const handleSubmit = async () => {
        console.log('submit clicked, token: ', token);
        if (!postContent.trim() || postContent.length > charLimit) return;

        setIsLoading(true);

        const result = await postService.createPost(postContent, token)

        if (result.success) {
            setPostContent('');
            if (onPostCreated) onPostCreated();
        } else {
            alert('Erreur lors de la publication :' + result.message);
        }
        setIsLoading(false);
    }

    
    return (
        <div className={styles.newPost}>            
            <textarea
                className={styles.textarea}
                placeholder="What's Up ?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            />
            <div className={styles.bottomBar}>                
                <span>{postContent.length}/{charLimit}</span>
                <Button 
                    onClick={() => handleSubmit()}
                    disabled={isLoading || !postContent.trim() || postContent.length > charLimit}
                >
                    {isLoading ? '...' : 'Post'}
                </Button>
            </div>
        </div>
    )
}

export default NewPost;