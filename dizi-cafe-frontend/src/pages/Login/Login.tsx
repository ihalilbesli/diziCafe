import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login, saveToken, getUserRole } from "../../services/authService";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Lütfen email ve şifre giriniz.");
      return;
    }

    try {
      const res = await login(email, password);

      // 🔴 Önceki: const token = res.data.token;
      // 🟢 Güncel:
      const token: string | undefined = res?.data?.jwtToken;

      if (!token) {
        console.error("Login response:", res?.data);
        setError("Sunucu token döndürmedi (jwtToken bulunamadı).");
        return;
      }

      saveToken(token);

      const role = getUserRole();
      console.log("Kullanıcı rolü:", role);

      navigate("/"); // Giriş başarılıysa yönlendirme yapılır
    } catch (err) {
      console.error("Giriş hatası:", err);
      setError("Email veya şifre hatalı!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.button}>
          Giriş Yap
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
