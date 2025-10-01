import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchFilms } from "../../services/filmService"; // senin servisin

import styles from "./SearchBar.module.css";

type Film = {
  id: number;
  title: string;
  posterUrl: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Film[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 1) {
        try {
          const res = await searchFilms({ title: query });
          setResults(res.data);
          setShowResults(true);
        } catch (err) {
          console.error("Arama hatası:", err);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 400); // kullanıcı yazmayı bıraktıktan 0.4 sn sonra istek atar

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (filmId: number) => {
    setQuery("");
    setShowResults(false);
    navigate(`/films/${filmId}`);
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Dizi veya Film Ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 1 && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)} 
      />

      {showResults && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((film) => (
            <li
              key={film.id}
              className={styles.resultItem}
              onClick={() => handleSelect(film.id)}
            >
              <img src={film.posterUrl} alt={film.title} />
              <span>{film.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
