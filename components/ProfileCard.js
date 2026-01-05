import styles from '../styles/HomePage/ProfileCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ProfileCard = ({profilePicture, firstname, username}) => {
    
    
    return (
        <Link href='/Profile' className={styles.cardLink}>
            <div className={styles.profileCard}>
                <Image
                    src={profilePicture || '/Default-Avatar.svg'}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className={styles.avatar}
                />
                <div className={styles.userInfo}>
                    <strong className={styles.firstname}>{firstname}</strong>
                    <p className={styles.username}>@{username}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProfileCard;