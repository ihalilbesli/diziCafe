import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { getAllFilms } from '../../services/filmService';
import FilmCard from '../../components/FilmCard/FilmCard';

type Film = {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  imdbRating: number;
};

export default function Home() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getAllFilms();
        setFilms(res.data);
      } catch (error) {
        console.error("Filmler alınamadı:", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dizi ve Filmler</h2>
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
    </div>
  );
}
