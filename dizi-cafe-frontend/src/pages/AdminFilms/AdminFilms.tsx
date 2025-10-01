import { useEffect, useState } from "react";
import styles from "./AdminFilms.module.css";
import {
    getAllFilms,
    searchFilms,
    deleteFilm
} from "../../services/filmService";
import { getAverageScore } from "../../services/ratingService";
import {
    getLikeCount,
    getDislikeCount
} from "../../services/filmLikeService";
import FilmEditModal from "../../components/FilmEditModal/FilmEditModal";
import FilmAddModal from "../../components/FilmAddModal/FilmAddModal"; 

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

export default function AdminFilms() {
    const [films, setFilms] = useState<Film[]>([]);
    const [search, setSearch] = useState("");
    const [avgRatings, setAvgRatings] = useState<{ [key: number]: number }>({});
    const [likes, setLikes] = useState<{ [key: number]: number }>({});
    const [dislikes, setDislikes] = useState<{ [key: number]: number }>({});
    const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
    const [showAddModal, setShowAddModal] = useState(false); // ✅ yeni state

    // Film verilerini yükle
    const fetchFilms = async () => {
        try {
            const res = await getAllFilms();
            const data: Film[] = res.data;
            setFilms(data);

            // Her film için ek veriler
            data.forEach(async (f) => {
                try {
                    const [avgRes, likeRes, dislikeRes] = await Promise.all([
                        getAverageScore(f.id),
                        getLikeCount(f.id),
                        getDislikeCount(f.id),
                    ]);

                    setAvgRatings((prev) => ({ ...prev, [f.id]: avgRes.data }));
                    setLikes((prev) => ({ ...prev, [f.id]: likeRes.data }));
                    setDislikes((prev) => ({ ...prev, [f.id]: dislikeRes.data }));
                } catch (err) {
                    console.error(`Film ek verileri alınamadı (id=${f.id})`, err);
                }
            });
        } catch (err) {
            console.error("Filmler alınamadı:", err);
        }
    };

    // Arama (her harfte çalışacak)
    const handleSearch = async (value: string) => {
        setSearch(value);

        if (value.trim() === "") {
            fetchFilms();
        } else {
            try {
                const res = await searchFilms({ title: value });
                setFilms(res.data);
            } catch (err) {
                console.error("Arama hatası:", err);
            }
        }
    };

    const handleDelete = async (id: number) => {
        console.log("🗑 Silme isteği başlatıldı. Film ID:", id);

        if (window.confirm("Bu filmi silmek istediğinize emin misiniz?")) {
            try {
                console.log("➡️ deleteFilm servisi çağrılıyor...");

                const res = await deleteFilm(id);

                console.log("✅ Silme başarılı, response:", res);

                fetchFilms();
            } catch (err: any) {
                console.error("❌ Film silme hatası:", err);

                if (err.response) {
                    console.error("📡 Response status:", err.response.status);
                    console.error("📡 Response data:", err.response.data);
                    console.error("📡 Response headers:", err.response.headers);
                } else if (err.request) {
                    console.error("📡 Request atıldı ama cevap gelmedi:", err.request);
                } else {
                    console.error("⚠️ Hata mesajı:", err.message);
                }
            }
        } else {
            console.log("❌ Kullanıcı silme işlemini iptal etti.");
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    return (
        <div className={styles.container}>
            <h2>Film Yönetimi</h2>

            {/* Film Ekle Butonu */}
            <div className={styles.actions}>
                <button onClick={() => setShowAddModal(true)} className={styles.addBtn}>
                    ➕ Film Ekle
                </button>
            </div>

            {/* Arama Kutusu */}
            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Film adı ile ara..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Film Tablosu */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Poster</th>
                        <th>Başlık</th>
                        <th>Tür</th>
                        <th>Yönetmen</th>
                        <th>Yıl</th>
                        <th>IMDb</th>
                        <th>Site Puanı</th>
                        <th>👍</th>
                        <th>👎</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((f) => (
                        <tr key={f.id}>
                            <td>{f.id}</td>
                            <td>
                                <img
                                    src={f.posterUrl || "/default-poster.jpg"}
                                    alt={f.title}
                                    className={styles.poster}
                                />
                            </td>
                            <td>{f.title}</td>
                            <td>{f.genre}</td>
                            <td>{f.director}</td>
                            <td>{f.year}</td>
                            <td>{f.imdbRating ?? "-"}</td>
                            <td>{avgRatings[f.id]?.toFixed(1) ?? "-"}</td>
                            <td>{likes[f.id] ?? 0}</td>
                            <td>{dislikes[f.id] ?? 0}</td>
                            <td>
                                <button
                                    onClick={() => setSelectedFilm(f)}
                                    className={styles.updateBtn}
                                >
                                    Güncelle
                                </button>
                                <button
                                    onClick={() => handleDelete(f.id)}
                                    className={styles.deleteBtn}
                                >
                                    Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Güncelleme Modalı */}
            {selectedFilm && (
                <FilmEditModal
                    film={selectedFilm}
                    onClose={() => setSelectedFilm(null)}
                    onUpdated={fetchFilms}
                />
            )}

            {/* Ekleme Modalı */}
            {showAddModal && (
                <FilmAddModal
                    onClose={() => setShowAddModal(false)}
                    onAdded={fetchFilms}
                />
            )}
        </div>
    );
}
