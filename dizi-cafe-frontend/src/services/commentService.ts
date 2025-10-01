import api from "./api";
const BASE_URL = "http://localhost:8080/diziCafe/comments";


export const addComment = async (
filmId: number,
content: string,
parentId?: number
) =>
api.post(`${BASE_URL}/add`, null, {
params: { filmId, content, parentId },
});


export const updateComment = async (commentId: number, newContent: string) =>
api.put(`${BASE_URL}/update/${commentId}?newContent=${newContent}`);


export const deleteComment = async (commentId: number) =>
api.delete(`${BASE_URL}/delete/${commentId}`);


export const getFilmComments = async (filmId: number) =>
api.get(`${BASE_URL}/film/${filmId}`);


export const getReplies = async (parentId: number) =>
api.get(`${BASE_URL}/replies/${parentId}`);

export const getMyComments = async () =>
  api.get(`${BASE_URL}/my-comments`);