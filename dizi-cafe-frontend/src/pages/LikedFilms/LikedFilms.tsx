import { useEffect, useState } from "react";
import styles from "./LikedFilms.module.css";
import { getMyLikedFilms } from "../../services/filmLikeService";
import FilmCard from "../../components/FilmCard/FilmCard";

type Film = {
  id: number;
  title: string;
  description?: string;
  posterUrl: string;
  imdbRating: number;
};

export default function LikedFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const res = await getMyLikedFilms();
        setFilms(res.data || []);
      } catch (error) {
        console.error("Beğenilen filmler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiked();
  }, []);

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Beğendiğim Filmler</h2>
      {films.length === 0 ? (
        <p className={styles.empty}>Henüz hiç film beğenmediniz.</p>
      ) : (
        <div className={styles.filmGrid}>
          {films.map((film) => (
            <FilmCard
              key={film.id}
              id={film.id}
              title={film.title}
              description={film.description}
              posterUrl={film.posterUrl}
              imdbRating={film.imdbRating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
