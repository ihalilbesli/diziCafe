import { useState } from "react";
import styles from "./UserEditModal.module.css";

type Props = {
  user: any;
  onSave: (updatedUser: any) => void;
  onClose: () => void;
};

export default function UserEditModal({ user, onSave, onClose }: Props) {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (field: string, value: any) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Kullanıcı Düzenle</h3>

        <label>Ad Soyad:</label>
        <input
          value={editedUser.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />

        <label>Kullanıcı Adı:</label>
        <input
          value={editedUser.nickname || ""}
          onChange={(e) => handleChange("nickname", e.target.value)}
        />

        <label>Email:</label>
        <input
          value={editedUser.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <label>Cinsiyet:</label>
        <select
          value={editedUser.gender || ""}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">Seçiniz</option>
          <option value="ERKEK">Erkek</option>
          <option value="KADIN">Kadın</option>
          <option value="BELIRTMEK_ISTEMIYOR">Belirtmek İstemiyor</option>
        </select>

        <label>Doğum Tarihi:</label>
        <input
          type="date"
          value={editedUser.birthDate || ""}
          onChange={(e) => handleChange("birthDate", e.target.value)}
        />

        <label>Rol:</label>
        <select
          value={editedUser.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="KULLANICI">KULLANICI</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <div className={styles.modalActions}>
          <button onClick={handleSave}>Kaydet</button>
          <button onClick={onClose}>Kapat</button>
        </div>
      </div>
    </div>
  );
}
