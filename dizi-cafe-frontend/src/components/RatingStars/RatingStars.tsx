import { useEffect, useState } from "react";
import styles from "./RatingStars.module.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  getMyRating,
  rateFilm,
  updateRating,
  deleteRating,
} from "../../services/ratingService";
import { getToken } from "../../services/authService";

type Props = {
  filmId: number;
};

const RatingStars = ({ filmId }: Props) => {
  const [myRating, setMyRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number>(0);

  useEffect(() => {
    const fetchMyRating = async () => {
      if (!getToken()) return;
      try {
        const res = await getMyRating(filmId);
        // backend artık Rating objesi döndürüyor, içinden score al
        setMyRating(res.data?.score || null);
      } catch (err) {
        console.error("Puan getirilemedi", err);
      }
    };
    fetchMyRating();
  }, [filmId]);

  const handleClick = async (score: number) => {
    if (!getToken()) {
      alert("Puan vermek için giriş yapmalısınız.");
      return;
    }
    try {
      if (myRating === null) {
        await rateFilm(filmId, score);
      } else {
        await updateRating(filmId, score);
      }
      setMyRating(score);
    } catch (err) {
      console.error("Puan gönderilemedi", err);
    }
  };

  const handleRemove = async () => {
    if (!getToken()) return;
    try {
      await deleteRating(filmId);
      setMyRating(null);
    } catch (err) {
      console.error("Puan silinemedi", err);
    }
  };

  // ⭐️ Hover sırasında 0.5 hassasiyetle değer hesaplama
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 2) {
      setHoverRating(index - 0.5);
    } else {
      setHoverRating(index);
    }
  };

  const renderStar = (index: number) => {
    const ratingToShow = hoverRating || myRating || 0;
    if (ratingToShow >= index) return <FaStar className={styles.star} />;
    if (ratingToShow >= index - 0.5) return <FaStarHalfAlt className={styles.star} />;
    return <FaRegStar className={styles.star} />;
  };

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.label}>Senin Puanın:</p>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onClick={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - left;
              if (x < width / 2) {
                handleClick(i - 0.5);
              } else {
                handleClick(i);
              }
            }}
            onMouseLeave={() => setHoverRating(0)}
          >
            {renderStar(i)}
          </span>
        ))}
        {myRating !== null && (
          <button className={styles.removeBtn} onClick={handleRemove}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default RatingStars;
