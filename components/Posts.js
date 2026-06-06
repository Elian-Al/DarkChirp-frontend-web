import styles from "../styles/HomePage/Posts.module.css";
import Image from "next/image";
import { FaTrashAlt, FaBookmark, FaRegHeart, FaHeart } from "react-icons/fa";
import { postService } from "../services/postService";
import useAuthStore from "../stores/authStore";
import { useState } from "react";
import { formatContent } from "./utils/hashtagLink";

const Posts = ({ profilePicture, firstname, createdAt, content, postId, onPostInteraction, isLike, isSave, likeNbr, saveNbr, isAuthor }) => {
    const [isLoading, setIsLoading] = useState(false);
    const token = useAuthStore((state) => state.token);
    let trashColor = "white";

    const publicationDate = new Date(createdAt).toLocaleString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const action_type = {
        like: "like",
        save: "save",
    };

    // const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
    const handleInteractPost = async ({ type }) => {
        setIsLoading(true);

        const result = await postService.interactPost(postId, token, type);

        if (result.success) {
            console.log(`Post ${type} avec succés.'`);
            if (onPostInteraction) onPostInteraction();
        } else {
            alert(`Erreur lors du ${type} du post :` + result.message);
        }
        setIsLoading(false);
    };

    const handleDeletePost = async () => {
        setIsLoading(true);
        trashColor = "red";

        const result = await postService.deletePost(postId, token);

        if (result.success) {
            if (onPostInteraction) onPostInteraction();
        } else {
            alert("Erreur lors de la suppression du post :" + result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.post}>
            <div className={styles.postAuthor}>
                {profilePicture && <Image src={profilePicture} width={50} height={50} alt="Profile Picture" className={styles.responsiveLogo} />}
                <strong className={styles.firstname}>{firstname}</strong>
                <p className={styles.publicationTime}>{publicationDate}</p>
            </div>
            <span className={styles.separation}></span>
            <div className={styles.postContentContainer}>
                <p className={styles.postContent}>{formatContent(content)}</p>
            </div>
            <div className={styles.postAction}>
                <div className={styles.interaction}>
                    {isLike ? (
                        <FaHeart onClick={() => handleInteractPost({ type: action_type.like })} color="red" style={{ cursor: "pointer" }} />
                    ) : (
                        <FaRegHeart onClick={() => handleInteractPost({ type: action_type.like })} style={{ cursor: "pointer" }} />
                    )}
                    <p className={styles.nbr}>{likeNbr}</p>
                </div>
                <div className={styles.interaction}>
                    <FaBookmark
                        onClick={() => handleInteractPost({ type: action_type.save })}
                        color={isSave ? "#FFD700" : "white"}
                        style={{ cursor: "pointer" }}
                    />
                    <p className={styles.nbr}>{saveNbr}</p>
                </div>
                {isAuthor && <FaTrashAlt onClick={handleDeletePost} color={trashColor} />}
            </div>
        </div>
    );
};

export default Posts;
