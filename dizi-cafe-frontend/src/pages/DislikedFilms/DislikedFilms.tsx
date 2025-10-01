import { useEffect, useState } from "react";
import styles from "./DislikedFilms.module.css";
import { getMyDislikedFilms } from "../../services/filmLikeService";
import FilmCard from "../../components/FilmCard/FilmCard";

type Film = {
  id: number;
  title: string;
  description?: string;
  posterUrl: string;
  imdbRating: number;
};

export default function DislikedFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisliked = async () => {
      try {
        const res = await getMyDislikedFilms();
        setFilms(res.data || []);
      } catch (error) {
        console.error("Beğenilmeyen filmler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisliked();
  }, []);

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Beğenmediğim Filmler</h2>
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
