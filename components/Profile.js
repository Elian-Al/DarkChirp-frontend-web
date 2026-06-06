import styles from "../styles/ProfilePage/Profile.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { postService } from "../services/postService";
import useAuthStore from "../stores/authStore";
import { useRouter } from "next/router";
import Posts from "../components/Posts";
import Button from "../components/UI/Button";
import ConfirmModal from "./ConfirmModal";
import Modal from "./UI/Modal";
import AccountDeletion from "./modalContent/AccountDeletion";
import { deleteAccount } from "../services/authService";
import { FaPen, FaEdit } from "react-icons/fa";
import UploadProfileImage from "./modalContent/UploadProfileImage";

function Profile() {
    const [activeTab, setActiveTab] = useState("mine");
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const skipRef = useRef(0);
    const limitRef = useRef(10);

    const user = useAuthStore((state) => state);
    const token = user.token;
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const hydrate = useAuthStore((state) => state.hydrate);

    // if (!token) {
    //     router.push("/");
    // }

    const fetchUserPosts = async (skipForced, limitForced, reset) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            console.log("Fetch");

            if (!token) return;

            console.log("skip:", skipForced);
            console.log("limit:", limitForced);

            const data = await postService.getUserPosts({
                token,
                tab: activeTab,
                skip: skipForced,
                limit: limitForced,
            });

            if (data.success) {
                if (reset) setPosts(data.result.data);
                else setPosts((prevPosts) => [...prevPosts, ...data.result.data]);
            }

            // if (currentTabPosts.length === 0 || (skipForced && limitForced)) {
            //     if (data.success && activeTab === "mine") {
            //         setPosts([...data.result.data]);
            //     } else if (data.success && activeTab === "liked") {
            //         setLikedPosts([...data.result.data]);
            //     } else if (data.success && activeTab === "saved") {
            //         setSavedPosts([...data.result.data]);
            //     }
            // } else {
            //     if (data.success && activeTab === "mine") {
            //         setPosts((prevPosts) => [...prevPosts, ...data.result.data]);
            //     } else if (data.success && activeTab === "liked") {
            //         setLikedPosts((prevPosts) => [...prevPosts, ...data.result.data]);
            //     } else if (data.success && activeTab === "saved") {
            //         setSavedPosts((prevPosts) => [...prevPosts, ...data.result.data]);
            //     }
            // }

            // console.log("nbr of post receive:", data.result.data.length);

            // console.log("current post in current tab:", currentTabPosts.length);

            // setSkip(skip + data.result.data.length);
        } finally {
            hydrate();
            setIsLoading(false);
        }
    };

    const currentTabPosts = activeTab === "mine" ? posts : activeTab === "liked" ? likedPosts : savedPosts;

    const handleTabChange = (tabSet) => {
        setPosts([]);
        setSkip(0);
        setActiveTab(tabSet);
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const handleOpenModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleOpenUploadModal = () => {
        setIsUploadModalOpen(true);
        console.log("Edit clicked");
    };

    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleDeleteAccount = async (password) => {
        const result = await deleteAccount(token, password);

        if (result.success) {
            logout();
            router.push("/");
        } else {
            alert(result.message);
        }
    };

    useEffect(() => {
        fetchUserPosts(0, 10, true);
    }, [activeTab, token]);

    return (
        <div className={styles.main}>
            <div className={styles.leftPart}>
                <div className={styles.logoPart}>
                    <Link href="/Home" className={styles.logoLink}>
                        <Image src="/favicon.ico.png" width={70} height={70} alt="DarkChirp Logo" />
                    </Link>
                </div>
            </div>
            <div className={styles.userPart}>
                <div className={styles.userInfo}>
                    <div className={styles.avatarContainer}>
                        <Image
                            src={user.profilePicture || "/Default-Avatar.svg"}
                            width={130}
                            height={130}
                            alt="User Avatar"
                            className={styles.avatar}
                        />
                        <div className={styles.setAvatar}>
                            <FaEdit onClick={() => handleOpenUploadModal()} style={{ cursor: "pointer" }} />
                        </div>
                    </div>
                    <div className={styles.name}>
                        <strong className={styles.firstname}>{user.firstname}</strong>
                        <p className={styles.username}>@{user.username}</p>
                    </div>
                </div>
                <div className={styles.postPart}>
                    <strong className={activeTab === "mine" ? styles.active : ""} onClick={() => handleTabChange("mine")}>
                        Mes Posts
                    </strong>
                    <strong className={activeTab === "liked" ? styles.active : ""} onClick={() => handleTabChange("liked")}>
                        Posts Likés
                    </strong>
                    <strong className={activeTab === "saved" ? styles.active : ""} onClick={() => handleTabChange("saved")}>
                        Posts Enregistrés
                    </strong>
                </div>
                <div className={styles.displayPosts}>
                    {isLoading && posts.length === 0 ? (
                        <span>Chargement des posts en cours...</span>
                    ) : (
                        <p className={styles.postsNumber}>{posts.length} posts affichés</p>
                    )}

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
                                onPostInteraction={() => {
                                    fetchUserPosts(0, posts.length, true);
                                }}
                                isLike={isLike}
                                isSave={isSave}
                                likeNbr={post.likes.length < 1000 ? `${post.likes.length}` : `${post.likes.length}k`}
                                saveNbr={post.saved.length < 1000 ? `${post.saved.length}` : `${post.saved.length}k`}
                                isAuthor={post.user.username === user.username ? true : false}
                            />
                        );
                    })}
                    <div className={styles.loadMoreButtonArea}>
                        {posts.length === 0 ? (
                            <span>Aucun post à afficher</span>
                        ) : (
                            <Button onClick={() => fetchUserPosts(posts.length, 11, false)}>Charger plus de posts</Button>
                        )}
                        {/* <Button onClick={fetchUserPosts}>Charger plus de posts</Button> */}
                    </div>
                </div>
            </div>
            <div className={styles.rightPart}>
                <div className={styles.actionButton}>
                    <Button onClick={handleLogout}>Se déconnecter</Button>
                    <Button onClick={handleOpenModal}>Supprimer le compte</Button>
                </div>
            </div>
            {/* <ConfirmModal isOpen={isDeleteModalOpen} onClose={handleCloseModal} submitDeleteAccount={(password) => handleDeleteAccount(password)} /> */}
            {/* <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModal}>
            </Modal> */}
            <AccountDeletion
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModal}
                submitDeleteAccount={(password) => handleDeleteAccount(password)}
            />
            <UploadProfileImage isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} onSuccess={() => fetchUserPosts()} />
        </div>
    );
}

export default Profile;
