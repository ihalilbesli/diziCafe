import api from "./api";
const BASE_URL = "http://localhost:8080/diziCafe/comment-likes";


export const likeComment = async (commentId: number) =>
api.post(`${BASE_URL}/like/${commentId}`);


export const dislikeComment = async (commentId: number) =>
api.post(`${BASE_URL}/dislike/${commentId}`);


export const removeReaction = async (commentId: number) =>
api.delete(`${BASE_URL}/remove/${commentId}`);


export const hasUserLiked = async (commentId: number) =>
api.get(`${BASE_URL}/hasLiked/${commentId}`);


export const hasUserDisliked = async (commentId: number) =>
api.get(`${BASE_URL}/hasDisliked/${commentId}`);


export const getLikeCount = async (commentId: number) =>
api.get(`${BASE_URL}/likeCount/${commentId}`);


export const getDislikeCount = async (commentId: number) =>
api.get(`${BASE_URL}/dislikeCount/${commentId}`);