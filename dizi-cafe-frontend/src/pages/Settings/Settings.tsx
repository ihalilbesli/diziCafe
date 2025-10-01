import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { getCurrentUser, updateUser, changePassword } from "../../services/userService";
import { getToken } from "../../services/authService";

export default function Settings() {
  const [user, setUser] = useState<any>(null);

  // Form state
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("OTHER");
  const [birthDate, setBirthDate] = useState("");

  // Şifre formu state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);

        setFullName(res.data.fullName);
        setNickname(res.data.nickname);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setBirthDate(res.data.birthDate);
      } catch (err) {
        console.error("Kullanıcı bilgileri alınamadı:", err);
      }
    };
    if (getToken()) fetchUser();
  }, []);

  const handleUpdateUser = async () => {
    try {
      await updateUser(user.id, {
        fullName,
        nickname,
        email,
        gender,
        birthDate
      });
      alert("Bilgileriniz başarıyla güncellendi!");
    } catch (err: any) {
      alert(err.response?.data || "Bilgi güncellenemedi.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword(user.id, oldPassword, newPassword);
      alert("Şifre başarıyla değiştirildi!");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      alert(err.response?.data || "Şifre değiştirilemedi.");
    }
  };

  if (!user) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ayarlar</h2>

      {/* Kullanıcı Bilgileri */}
      <div className={styles.card}>
        <h3>Hesap Bilgileri</h3>
        <div className={styles.formGroup}>
          <label>Ad Soyad</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Kullanıcı Adı</label>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Cinsiyet</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="MALE">Erkek</option>
            <option value="FEMALE">Kadın</option>
            <option value="OTHER">Diğer</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Doğum Tarihi</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <button className={styles.saveBtn} onClick={handleUpdateUser}>
          Kaydet
        </button>
      </div>

      {/* Şifre Değiştir */}
      <div className={styles.card}>
        <h3>Şifre Değiştir</h3>
        <div className={styles.formGroup}>
          <label>Eski Şifre</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Yeni Şifre</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button className={styles.saveBtn} onClick={handleChangePassword}>
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  );
}
