import api from "./api"; // ✅ interceptor'lı axios instance

const BASE_URL = "http://localhost:8080/diziCafe/users";

// Oturum açmış kullanıcı bilgisi
export const getCurrentUser = async () =>
  api.get(`${BASE_URL}/me`);

// Kullanıcı güncelleme
export const updateUser = async (id: number, updatedUser: any) =>
  api.put(`${BASE_URL}/${id}`, updatedUser);

// Şifre değiştirme
export const changePassword = async (id: number, oldPassword: string, newPassword: string) =>
  api.put(`${BASE_URL}/${id}/change-password`, null, {
    params: { oldPassword, newPassword },
  });

// Admin: tüm kullanıcıları çekme (frontend’te şimdilik gerekmez ama ekledim)
export const getAllUsers = async () =>
  api.get(`${BASE_URL}`);

// Admin: kullanıcı silme
export const deleteUser = async (id: number) =>
  api.delete(`${BASE_URL}/${id}`);

export const toggleBanUser = (userId: number) =>
  api.put(`${BASE_URL}/${userId}/toggle-ban`);
