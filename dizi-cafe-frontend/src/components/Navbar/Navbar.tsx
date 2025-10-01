import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getToken, logout, getUserRole } from "../../services/authService"; 
import { FaBars } from "react-icons/fa";
import logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "../SearchBar/SearchBar";
import { getCurrentUser } from "../../services/userService";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const role = getUserRole(); 

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getCurrentUser();
          setNickname(res.data.nickname);
        } catch (error) {
          console.error("Kullanıcı bilgisi alınamadı:", error);
        }
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
        />
        <span className={styles.slogan}>DiziCafe - Keyfin Adresi</span>

        {/* Static links */}
        <Link to="/terms" className={styles.link}>Kullanım Şartları</Link>
        <Link to="/privacy" className={styles.link}>Gizlilik</Link>
        <Link to="/faq" className={styles.link}>SSS</Link>
      </div>

      <div className={styles.center}>
        <SearchBar />
      </div>

      <div className={styles.right}>
        {!token ? (
          <>
            <Link to="/login" className={styles.button}>
              Giriş Yap
            </Link>
            <Link to="/register" className={styles.button}>
              Kayıt Ol
            </Link>
          </>
        ) : (
          <div className={styles.profileArea}>
            <span className={styles.welcome}>
              Hoşgeldiniz, {nickname || "Kullanıcı"}
            </span>
            <FaBars
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <ProfileMenu
                onLogout={handleLogout}
                onClose={() => setMenuOpen(false)}
                role={role} 
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
