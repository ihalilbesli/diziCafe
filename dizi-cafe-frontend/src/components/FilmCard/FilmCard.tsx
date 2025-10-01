import styles from "./FilmCard.module.css";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaCommentDots,
  FaThumbsDown,
  FaRegThumbsDown,
  FaUsers
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { getAverageScore } from "../../services/ratingService";
import { getToken } from "../../services/authService";

type FilmProps = {
  id: number;
  title: string;
  description?: string;   // ✅ opsiyonel hale getirdik
  posterUrl: string;
  imdbRating: number;
};

const FilmCard = ({ id, title, description, posterUrl, imdbRating }: FilmProps) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avgRating, setAvgRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const likedRes = await hasLiked(id);
        const dislikedRes = await hasDisliked(id);
        const savedRes = await isInCollection(id);
        const avgRes = await getAverageScore(id);

        setLiked(likedRes.data);
        setDisliked(dislikedRes.data);
        setSaved(savedRes.data);
        setAvgRating(avgRes.data);
      } catch (error) {
        console.error("Durumlar alınamadı:", error);
      }
    };
    fetchStatus();
  }, [id]);

  const requireAuth = () => {
    if (!getToken()) {
      alert("Bu işlemi yapmak için giriş yapmalısınız.");
      return false;
    }
    return true;
  };

  const handleLike = async () => {
    if (!requireAuth()) return;
    try {
      if (liked) {
        await removeReaction(id);
        setLiked(false);
      } else {
        if (disliked) {
          await removeReaction(id);
          setDisliked(false);
        }
        await likeFilm(id);
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
        await removeReaction(id);
        setDisliked(false);
      } else {
        if (liked) {
          await removeReaction(id);
          setLiked(false);
        }
        await dislikeFilm(id);
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
        await removeFromCollection(id);
        setSaved(false);
      } else {
        await addToCollection(id, "IZLEMEK_ISTEDIKLERIM");
        setSaved(true);
      }
    } catch (error) {
      console.error("Kaydetme hatası:", error);
    }
  };

  const handleNavigate = () => {
    if (!requireAuth()) return;
    navigate(`/films/${id}`);
  };

  return (
    <div className={styles.card}>
      <img src={posterUrl} alt={title} className={styles.poster} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description
            ? description.length > 100
              ? description.substring(0, 100) + "..."
              : description
            : "Açıklama bulunmuyor"}
        </p>
        <p className={styles.rating}>⭐ IMDb: {imdbRating}</p>

        <div className={styles.actions}>
          {avgRating !== null && (
            <span className={styles.avgRating}>
              <FaUsers /> {avgRating.toFixed(1)}
            </span>
          )}

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

          <FaCommentDots
            className={styles.icon}
            title="Yorum Yap"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
