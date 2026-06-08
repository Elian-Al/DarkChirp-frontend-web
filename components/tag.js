import styles from "../styles/HomePage/Tags.module.css";
import { formatContent } from "./utils/hashtagLink";

const Tags = ({ name, count }) => {
  return (
    <div className={styles.tag}>
      <p className={styles.hashtag}>{formatContent(`#${name}`)}</p>
    </div>
  );
};

export default Tags;
