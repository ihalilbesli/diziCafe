import { useEffect, useState } from "react";
import styles from "./SavedFilms.module.css";
import { getUserCollection } from "../../services/collectionService";
import FilmCard from "../../components/FilmCard/FilmCard";

type Film = {
  id: number;
  title: string;
  description?: string;
  posterUrl: string;
  imdbRating: number;
};

type Collection = {
  id: number;
  status: string;
  film: Film;
};

export default function SavedFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await getUserCollection("IZLEMEK_ISTEDIKLERIM");

        const mapped: Film[] = res.data.map((c: Collection) => c.film);
        setFilms(mapped || []);
      } catch (error) {
        console.error("Kaydedilen filmler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Kaydedilen Filmlerim</h2>
      {films.length === 0 ? (
        <p className={styles.empty}>Henüz hiç film kaydetmediniz.</p>
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
