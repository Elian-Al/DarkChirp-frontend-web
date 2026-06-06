import styles from "../../styles/UI/Loading.module.css";
import Image from "next/image";

const Loading = ({ children, ...props }) => {
  return (
    <div className={styles.loadingContainer}>
      <h3>{children}</h3>
      <Image
        src="/Circle Loading Sticker by MotionIsland.gif"
        width={100}
        height={100}
        alt="Loading Image"
      />
    </div>
  );
};

export default Loading;
