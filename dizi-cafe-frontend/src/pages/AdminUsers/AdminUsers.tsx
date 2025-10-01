import { useEffect, useState } from "react";
import styles from "./AdminUsers.module.css";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  toggleBanUser,
} from "../../services/userService";
import { FaUserEdit, FaUserTimes, FaTrash } from "react-icons/fa";
import UserEditModal from "../../components/UserEditModal/UserEditModal";

type User = {
  id: number;
  fullName: string;
  nickname: string;
  email: string;
  role: string;
  banned: boolean;
  gender?: string;
  birthDate?: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Kullanıcılar alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      alert("Kullanıcı güncellendi!");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert("Kullanıcı güncellenemedi.");
    }
  };

  const handleToggleBan = async (id: number) => {
    try {
      await toggleBanUser(id);
      fetchUsers();
    } catch (err) {
      alert("Ban işlemi başarısız!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert("Kullanıcı silinemedi!");
    }
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className={styles.container}>
      <h2>Kullanıcı Yönetimi</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad Soyad</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Cinsiyet</th>
            <th>Doğum Tarihi</th>
            <th>Yaş</th>
            <th>Rol</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.nickname}</td>
              <td>{u.email}</td>
              <td>{u.gender || "-"}</td>
              <td>{u.birthDate || "-"}</td>
              <td>{calculateAge(u.birthDate)}</td>
              <td>{u.role}</td>
              <td>{u.banned ? "🚫 Banlı" : "✅ Aktif"}</td>
              <td>
                <button
                  className={styles.btnAction}
                  onClick={() => setSelectedUser(u)}
                >
                  <FaUserEdit /> Düzenle
                </button>
                <button
                  className={styles.btnBan}
                  onClick={() => handleToggleBan(u.id)}
                >
                  <FaUserTimes /> {u.banned ? "Banı Kaldır" : "Banla"}
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(u.id)}
                >
                  <FaTrash /> Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Düzenleme Modalı */}
      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
