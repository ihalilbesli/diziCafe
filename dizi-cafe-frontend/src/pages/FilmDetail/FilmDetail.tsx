import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FilmDetail.module.css";
import { getFilmById } from "../../services/filmService";
import { getAverageScore } from "../../services/ratingService";
import { getToken } from "../../services/authService";
import {
    likeFilm,
    dislikeFilm,
    removeReaction,
    hasLiked,
    hasDisliked
} from "../../services/filmLikeService";
import {
    addToCollection,
    removeFromCollection,
    isInCollection
} from "../../services/collectionService";
import {
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaRegBookmark,
    FaThumbsDown,
    FaRegThumbsDown,
    FaUsers
} from "react-icons/fa";
import CommentSection from "../../components/CommenSection/CommentSection";
import RatingStars from "../../components/RatingStars/RatingStars";


type Film = {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    imdbRating: number;
    genre: string;
    year: string;
    director: string;
};

export default function FilmDetail() {
    const { id } = useParams();
    const [film, setFilm] = useState<Film | null>(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [avgRating, setAvgRating] = useState<number | null>(null);
    const isLoggedIn = !!getToken();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const filmRes = await getFilmById(parseInt(id));
                    setFilm(filmRes.data);

                    // ortalama puan herkese açık
                    const avgRes = await getAverageScore(parseInt(id));
                    setAvgRating(avgRes.data);

                    // like/dislike/save sadece login kullanıcıya sorgulansın
                    if (isLoggedIn) {
                        const likedRes = await hasLiked(parseInt(id));
                        const dislikedRes = await hasDisliked(parseInt(id));
                        const savedRes = await isInCollection(parseInt(id));
                        setLiked(likedRes.data);
                        setDisliked(dislikedRes.data);
                        setSaved(savedRes.data);
                    }
                } catch (err) {
                    console.error("Veriler alınamadı:", err);
                }
            }
        };
        fetchData();
    }, [id, isLoggedIn]);

    const requireAuth = () => {
        if (!isLoggedIn) {
            alert("Bu işlemi yapmak için giriş yapmalısınız.");
            return false;
        }
        return true;
    };

    const handleLike = async () => {
        if (!requireAuth()) return;
        try {
            if (liked) {
                await removeReaction(Number(id));
                setLiked(false);
            } else {
                if (disliked) {
                    await removeReaction(Number(id));
                    setDisliked(false);
                }
                await likeFilm(Number(id));
                setLiked(true);
            }
        } catch (error) {
            console.error("Beğenme hatası:", error);
        }
    };

    const handleDislike = async () => {
        if (!requireAuth()) return;
        try {
            if (disliked) {
                await removeReaction(Number(id));
                setDisliked(false);
            } else {
                if (liked) {
                    await removeReaction(Number(id));
                    setLiked(false);
                }
                await dislikeFilm(Number(id));
                setDisliked(true);
            }
        } catch (error) {
            console.error("Beğenmeme hatası:", error);
        }
    };

    const handleSave = async () => {
        if (!requireAuth()) return;
        try {
            if (saved) {
                await removeFromCollection(Number(id));
                setSaved(false);
            } else {
                await addToCollection(Number(id), "IZLEMEK_ISTEDIKLERIM");
                setSaved(true);
            }
        } catch (error) {
            console.error("Kaydetme hatası:", error);
        }
    };

    if (!film) return <div>Yükleniyor...</div>;

    return (
        <div className={styles.detailContainer}>
            <div className={styles.topSection}>
                <img src={film.posterUrl} alt={film.title} className={styles.poster} />
                <div className={styles.info}>
                    <h2>{film.title}</h2>
                    <p><strong>Yıl:</strong> {film.year}</p>
                    <p><strong>Tür:</strong> {film.genre}</p>
                    <p><strong>Yönetmen:</strong> {film.director}</p>
                    <p><strong>IMDb:</strong> {film.imdbRating}</p>
                    <p className={styles.description}>{film.description}</p>

                    <div className={styles.actions}>
                        {avgRating !== null && (
                            <span className={styles.avgRating}>
                                <FaUsers /> {avgRating.toFixed(1)}
                            </span>
                        )}

                        {/* login değilse sadece ikon görsün, tıklarsa alert gelsin */}
                        {liked ? (
                            <FaHeart className={styles.icon} title="Beğendin" onClick={handleLike} />
                        ) : (
                            <FaRegHeart className={styles.icon} title="Beğen" onClick={handleLike} />
                        )}

                        {disliked ? (
                            <FaThumbsDown className={styles.icon} title="Beğenmedin" onClick={handleDislike} />
                        ) : (
                            <FaRegThumbsDown className={styles.icon} title="Beğenme" onClick={handleDislike} />
                        )}

                        {saved ? (
                            <FaBookmark className={styles.icon} title="Kaydedildi" onClick={handleSave} />
                        ) : (
                            <FaRegBookmark className={styles.icon} title="Kaydet" onClick={handleSave} />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.commentSection}>
                <RatingStars filmId={film.id} />
                <CommentSection filmId={film.id} />
            </div>
        </div>
    );
}
