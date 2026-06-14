import styles from "../styles/ProfilePage/Profile.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { postService } from "../services/postService";
import useAuthStore from "../stores/authStore";
import { useRouter } from "next/router";
import Posts from "../components/Posts";
import Button from "../components/UI/Button";
import Modal from "./UI/Modal";
import AccountDeletion from "./modalContent/AccountDeletion";
import { deleteAccount } from "../services/authService";
import { FaPen, FaEdit } from "react-icons/fa";
import UploadProfileImage from "./modalContent/UploadProfileImage";
import PasswordChange from "./modalContent/passwordChange";
import withAuth from "./hoc/withAuth";

function Profile() {
  const [activeTab, setActiveTab] = useState("mine");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);

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
    } finally {
      hydrate();
      setIsLoading(false);
    }
  };

  // const currentTabPosts =
  //   activeTab === "mine" ? posts : activeTab === "liked" ? likedPosts : savedPosts;

  const handleTabChange = (tabSet) => {
    setPosts([]);
    setSkip(0);
    setActiveTab(tabSet);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleOpenModal = (type) => {
    if (type === "Upload") setIsUploadModalOpen(true);
    if (type === "Delete") setIsDeleteModalOpen(true);
    if (type === "PasswordChange") setIsPasswordChangeModalOpen(true);
  };

  const handleCloseModal = (type) => {
    if (type === "Upload") setIsUploadModalOpen(false);
    if (type === "Delete") setIsDeleteModalOpen(false);
    if (type === "PasswordChange") setIsPasswordChangeModalOpen(false);
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
              <FaEdit onClick={() => handleOpenModal("Upload")} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className={styles.name}>
            <strong className={styles.firstname}>{user.firstname}</strong>
            <p className={styles.username}>@{user.username}</p>
          </div>
        </div>
        <div className={styles.postPart}>
          <strong
            className={activeTab === "mine" ? styles.active : ""}
            onClick={() => handleTabChange("mine")}
          >
            Mes Posts
          </strong>
          <strong
            className={activeTab === "liked" ? styles.active : ""}
            onClick={() => handleTabChange("liked")}
          >
            Posts Likés
          </strong>
          <strong
            className={activeTab === "saved" ? styles.active : ""}
            onClick={() => handleTabChange("saved")}
          >
            Posts Enregistrés
          </strong>
        </div>
        <div className={styles.displayPosts}>
          {isLoading && posts.length === 0 ? (
            <span>Chargement des posts en cours...</span>
          ) : (
            <p className={styles.postsNumber}>
              {posts.length === 1
                ? `${posts.length} post affichés`
                : posts.length === 0
                  ? ""
                  : `${posts.length} posts affichés`}
            </p>
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
          <div className={styles.loadMoreButtonArea}>
            {posts.length === 0 && !isLoading && <span>Aucun post à afficher</span>}
            {posts.length > 0 && !isLoading && (
              <Button onClick={() => fetchUserPosts(posts.length, 11, false)}>
                Charger plus de posts
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.actionButton}>
          <Button onClick={handleLogout}>Se déconnecter</Button>
          <Button onClick={() => handleOpenModal("PasswordChange")}>
            Modifier le mot de passe
          </Button>
          <Button onClick={() => handleOpenModal("Delete")}>Supprimer le compte</Button>
        </div>
      </div>
      <AccountDeletion
        isOpen={isDeleteModalOpen}
        onClose={() => handleCloseModal("Delete")}
        submitDeleteAccount={(password) => handleDeleteAccount(password)}
      />
      <UploadProfileImage
        isOpen={isUploadModalOpen}
        onClose={() => handleCloseModal("Upload")}
        onSuccess={() => fetchUserPosts(0, posts.length, true)}
      />
      <PasswordChange
        isOpen={isPasswordChangeModalOpen}
        onClose={() => handleCloseModal("PasswordChange")}
      />
    </div>
  );
}

export default withAuth(Profile);
