import api from "./api"; // token interceptor'lı axios instance

const BASE_URL = "http://localhost:8080/diziCafe/film-likes";

export const likeFilm = async (filmId: number) =>
  api.post(`${BASE_URL}/like/${filmId}`);

export const dislikeFilm = async (filmId: number) =>
  api.post(`${BASE_URL}/dislike/${filmId}`);

export const removeReaction = async (filmId: number) =>
  api.delete(`${BASE_URL}/remove/${filmId}`);

export const hasLiked = async (filmId: number) =>
  api.get<boolean>(`${BASE_URL}/hasLiked/${filmId}`);

export const hasDisliked = async (filmId: number) =>
  api.get<boolean>(`${BASE_URL}/hasDisliked/${filmId}`);

export const getLikeCount = async (filmId: number) =>
  api.get<number>(`${BASE_URL}/likeCount/${filmId}`);

export const getDislikeCount = async (filmId: number) =>
  api.get<number>(`${BASE_URL}/dislikeCount/${filmId}`);

export const getMyLikedFilms = async () =>
  api.get(`${BASE_URL}/my-likes`);

export const getMyDislikedFilms = async () =>
  api.get(`${BASE_URL}/my-dislikes`);
