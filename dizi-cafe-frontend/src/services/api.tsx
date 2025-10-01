import axios from "axios";
import { getToken, logout } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8080/diziCafe",
});

// Her istek öncesi token'ı ekle
api.interceptors.request.use(
  (config) => {
    console.log(`🌍 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log("📩 Headers:", config.headers);
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Eğer token geçersizse otomatik logout ve login'e yönlendirme
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token geçersiz veya süresi dolmuş, çıkış yapılıyor.");
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
