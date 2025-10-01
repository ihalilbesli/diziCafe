
import api from "./api";


const BASE_URL = "http://localhost:8080/diziCafe/films";


export const getAllFilms = async () => api.get(`${BASE_URL}/all`);


export const getFilmById = async (id: number) => api.get(`${BASE_URL}/${id}`);


export const searchFilms = async (params: {
    title?: string;
    genre?: string;
    director?: string;
    minRating?: number;
}) => api.get(`${BASE_URL}/search`, { params });



export const updateFilm = async (id: number, updatedFilm: any) =>
    api.put(`${BASE_URL}/update/${id}`, updatedFilm);


export const deleteFilm = async (id: number) =>
    api.delete(`${BASE_URL}/delete/${id}`);

export const getAllFilmsPaged = async (page: number, size: number = 20) =>
    api.get(`${BASE_URL}?page=${page}&size=${size}`);

export const addFilmByImdbId = async (imdbId: string) =>
    api.post(`${BASE_URL}/fetch?imdbId=${imdbId}`);

export const addMultipleFilms = async (imdbIds: string[]) =>
    api.post(`${BASE_URL}/fetch-multiple`, imdbIds);

