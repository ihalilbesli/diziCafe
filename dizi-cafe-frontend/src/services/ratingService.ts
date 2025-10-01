import api from "./api";
const BASE_URL = "http://localhost:8080/diziCafe/ratings";


export const rateFilm = async (filmId: number, score: number) =>
api.post(`${BASE_URL}/${filmId}?score=${score}`);


export const updateRating = async (filmId: number, newScore: number) =>
api.put(`${BASE_URL}/${filmId}?newScore=${newScore}`);


export const deleteRating = async (filmId: number) =>
api.delete(`${BASE_URL}/${filmId}`);


export const getAverageScore = async (filmId: number) =>
api.get(`${BASE_URL}/${filmId}/average`);


export const getMyRating = async (filmId: number) =>
api.get(`${BASE_URL}/${filmId}/my-rating`);