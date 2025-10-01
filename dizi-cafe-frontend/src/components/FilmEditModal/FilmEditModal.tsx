import { useState, useEffect } from "react";
import styles from "./FilmEditModal.module.css";
import { updateFilm } from "../../services/filmService";

type Film = {
  id: number;
  title: string;
  genre: string;
  year: string;
  director: string;
  imdbRating: number;
  posterUrl: string;
  description: string;
};

type Props = {
  film: Film | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function FilmEditModal({ film, onClose, onUpdated }: Props) {
  const [formData, setFormData] = useState<Film | null>(film);

  useEffect(() => {
    setFormData(film);
  }, [film]);

  if (!formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as Film);
  };

  const handleSubmit = async () => {
    try {
      await updateFilm(formData.id, formData);
      alert("Film güncellendi!");
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Film güncelleme hatası:", err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Film Güncelle</h3>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Başlık" />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Tür" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Yıl" />
        <input name="director" value={formData.director} onChange={handleChange} placeholder="Yönetmen" />
        <input name="imdbRating" type="number" value={formData.imdbRating} onChange={handleChange} placeholder="IMDb" />
        <input name="posterUrl" value={formData.posterUrl} onChange={handleChange} placeholder="Poster URL" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Açıklama" />

        <div className={styles.actions}>
          <button onClick={handleSubmit}>Kaydet</button>
          <button onClick={onClose} className={styles.cancel}>İptal</button>
        </div>
      </div>
    </div>
  );
}
