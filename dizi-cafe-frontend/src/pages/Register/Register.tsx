import React, { useState } from "react";
import styles from "./Register.module.css";
import { register, saveToken } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaTransgender } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    nickname: "",     // <-- nickName değil nickname
    email: "",
    password: "",
    gender: "",
    birthDate: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password || !form.nickname) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      const res = await register(form);

      // Eğer backend AuthResponse{ jwtToken } döndürüyorsa:
      const token: string | undefined = res?.data?.jwtToken;
      if (token) {
        saveToken(token);
      }

      navigate("/");
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setError("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <FaUser />
          <input
            type="text"
            name="fullName"                 // <-- DÜZELTİLDİ
            placeholder="Ad Soyad"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaUser />
          <input
            type="text"
            name="nickname"                 // <-- DÜZELTİLDİ
            placeholder="Kullanıcı Adı"
            value={form.nickname}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaTransgender />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Cinsiyet Seçin</option>
            <option value="ERKEK">Erkek</option>
            <option value="KADIN">Kadın</option>
            <option value="BELIRTMEK_ISTEMIYOR">Belirtmek İstemiyor</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <MdDateRange />
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          Kayıt Ol
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Register;
