import api from "./api";

const BASE_URL = "http://localhost:8080/diziCafe/auth";

export const login = async (email: string, password: string) => {
  return await api.post(`${BASE_URL}/login`, { email, password });
};

export const register = async (data: {
  fullName: string;
  nickname: string;   
  email: string;
  password: string;
  gender?: string;
  birthDate?: string;
}) => {
  return await api.post(`${BASE_URL}/register`, data);
};

export const saveToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
};
export const getToken = (): string | null => localStorage.getItem("jwtToken");
export const logout = () => localStorage.removeItem("jwtToken");

export const decodeToken = (token: string): any => {
  try {
    const payload = token.split(".")[1];
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64.padEnd(b64.length + (4 - (b64.length % 4)) % 4, "=");
    return JSON.parse(atob(padded));
  } catch (err) {
    console.error("Token çözümleme hatası:", err);
    return null;
  }
};

export const getUserRole = (): string | null => {
  const t = getToken(); if (!t) return null;
  return decodeToken(t)?.role ?? null;
};
export const getUserId = (): number | null => {
  const t = getToken(); if (!t) return null;
  const sub = decodeToken(t)?.sub;
  return sub ? parseInt(sub) : null;
};
