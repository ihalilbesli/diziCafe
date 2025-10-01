import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import {
  FaCog,
  FaHeart,
  FaCommentDots,
  FaSignOutAlt,
  FaThumbsDown,
  FaBookmark,
  FaUsers,
  FaFilm
} from "react-icons/fa";
import { useEffect, useRef } from "react";

interface Props {
  onLogout: () => void;
  onClose: () => void;
  role?: string | null;
}

const ProfileMenu = ({ onLogout, onClose, role }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.profileMenu} ref={menuRef}>
      {role !== "ADMIN" ? (
        <>
          <Link to="/saved" className={styles.menuItem}>
            <FaBookmark /> Kaydedilenler
          </Link>
          <Link to="/liked" className={styles.menuItem}>
            <FaHeart /> Beğendiklerim
          </Link>
          <Link to="/disliked" className={styles.menuItem}>
            <FaThumbsDown /> Beğenmediklerim
          </Link>
          <Link to="/my-comments" className={styles.menuItem}>
            <FaCommentDots /> Yorumlarım
          </Link>
          <Link to="/settings" className={styles.menuItem}>
            <FaCog /> Ayarlar
          </Link>
        </>
      ) : (
        <>
          <Link to="/users" className={styles.menuItem}>
            <FaUsers /> Kullanıcılar
          </Link>
          <Link to="/comments" className={styles.menuItem}>
            <FaCommentDots /> Yorumlar
          </Link>
          <Link to="/films" className={styles.menuItem}>
            <FaFilm /> Filmler
          </Link>
          <Link to="/settings" className={styles.menuItem}>
            <FaCog /> Ayarlar
          </Link>
        </>
      )}

      <div
        className={`${styles.menuItem} ${styles.logout}`}
        onClick={() => {
          onLogout();   
          onClose();    
        }}
      >
        <FaSignOutAlt /> Çıkış Yap
      </div>
    </div>
  );
};

export default ProfileMenu;
