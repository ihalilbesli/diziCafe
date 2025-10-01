import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaCog, FaHeart, FaCommentDots, FaSignOutAlt, FaThumbsDown, FaBookmark } from "react-icons/fa";

interface Props {
  onLogout: () => void;
}

const ProfileMenu = ({ onLogout }: Props) => {
  return (
    <div className={styles.profileMenu}>
      <Link to="/saved" className={styles.menuItem}><FaBookmark /> Kaydedilenler</Link>
      <Link to="/liked" className={styles.menuItem}><FaHeart /> Beğendiklerim</Link>
      <Link to="/disliked" className={styles.menuItem}><FaThumbsDown /> Beğenmediklerim</Link>
      <Link to="/my-comments" className={styles.menuItem}><FaCommentDots /> Yorumlarım</Link>
      <Link to="/settings" className={styles.menuItem}><FaCog /> Ayarlar</Link>
      <div className={`${styles.menuItem} ${styles.logout}`} onClick={onLogout}>
        <FaSignOutAlt /> Çıkış Yap
      </div>
    </div>
  );
};

export default ProfileMenu;
