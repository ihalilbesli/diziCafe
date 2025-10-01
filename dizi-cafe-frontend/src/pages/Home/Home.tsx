import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { getAllFilmsPaged } from '../../services/filmService';
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
  const [page, setPage] = useState(0); // şu anki sayfa
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await getAllFilmsPaged(page, 25); 
        setFilms(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Filmler alınamadı:", error);
      }
    };

    fetchFilms();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

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

      {/* Sayfa numaraları */}
      <div className={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
        >
          ← Önceki
        </button>

        {/* Dinamik sayfa numaraları */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i ? styles.activePage : ""}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
