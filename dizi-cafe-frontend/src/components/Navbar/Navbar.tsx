import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getToken, decodeToken, logout } from "../../services/authService";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/Logo3.png";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const decoded = token ? decodeToken(token) : null;
  const [menuOpen, setMenuOpen] = useState(false);

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
        <span className={styles.slogan}>DiziCafe - Keyifli İzlemeler</span>

        {/* Static links */}
        <Link to="/terms" className={styles.link}>Kullanım Şartları</Link>
        <Link to="/privacy" className={styles.link}>Gizlilik</Link>
        <Link to="/faq" className={styles.link}>SSS</Link>
      </div>

      <div className={styles.center}>
        <input
          type="text"
          className={styles.search}
          placeholder="Dizi veya Film Ara..."
        />
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
              Hoşgeldiniz, {decoded?.fullName || decoded?.nickname}
            </span>
            <FaBars
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && <ProfileMenu onLogout={handleLogout} />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
