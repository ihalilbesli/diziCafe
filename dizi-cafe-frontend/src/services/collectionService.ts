import api from "./api";
const BASE_URL = "http://localhost:8080/diziCafe/collections";


export const addToCollection = async (filmId: number, status: string) =>
api.post(`${BASE_URL}/${filmId}?status=${status}`);


export const removeFromCollection = async (filmId: number) =>
api.delete(`${BASE_URL}/${filmId}`);


export const getUserCollection = async (status: string) =>
api.get(`${BASE_URL}?status=${status}`);


export const isInCollection = async (filmId: number) =>
api.get(`${BASE_URL}/${filmId}/exists`);