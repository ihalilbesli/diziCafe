import { useMemo, useState } from "react";
import styles from "./FilmAddModal.module.css";
import { addFilmByImdbId, addMultipleFilms } from "../../services/filmService";

type Props = {
  onClose: () => void;
  onAdded: () => void; // tabloyu yenilemek için
};

const splitToIds = (raw: string) =>
  Array.from(
    new Set(
      raw
        .split(/[\s,;]+/g) // boşluk, virgül, noktalı virgül, satır sonu
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );

const isValidImdbId = (id: string) => /^tt\d{7,}$/.test(id);

export default function FilmAddModal({ onClose, onAdded }: Props) {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const ids = useMemo(() => splitToIds(raw), [raw]);
  const validIds = useMemo(() => ids.filter(isValidImdbId), [ids]);
  const invalidIds = useMemo(() => ids.filter((i) => !isValidImdbId(i)), [ids]);

  const handleSubmit = async () => {
    if (validIds.length === 0) {
      alert("En az bir geçerli IMDb ID giriniz (örn: tt1375666).");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      if (validIds.length === 1) {
        const res = await addFilmByImdbId(validIds[0]);
        setResult(`✅ Eklenen film: ${res.data}`);
      } else {
        const res = await addMultipleFilms(validIds);
        // backend array dönüyor -> string listesi
        if (Array.isArray(res.data)) {
          setResult(`✅ Eklenen filmler:\n- ${res.data.join("\n- ")}`);
        } else {
          setResult(`✅ Sonuç: ${res.data}`);
        }
      }
      onAdded(); // tabloyu yenile
    } catch (err: any) {
      console.error("Film ekleme hatası:", err);
      const msg =
        err?.response?.data ||
        err?.message ||
        "Film(ler) eklenirken bir hata oluştu.";
      setResult(`❌ Hata: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Film Ekle</h2>

        <div className={styles.formGroup}>
          <label>IMDb ID(ler)i</label>
          <textarea
            rows={6}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={`örnekler:\ntt1375666\ntt1001000 tt1001001 tt1001002`}
          />

          <div className={styles.meta}>
            <span>Bulunan: {ids.length}</span>
            <span>Geçerli: {validIds.length}</span>
            {invalidIds.length > 0 && (
              <span className={styles.warn}>
                Geçersiz: {invalidIds.length} ({invalidIds.slice(0, 3).join(", ")}
                {invalidIds.length > 3 ? "..." : ""})
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={handleSubmit} disabled={loading}>
              {loading
                ? "Ekleniyor..."
                : validIds.length <= 1
                ? "Ekle"
                : `Toplu Ekle (${validIds.length})`}
            </button>
            <button onClick={onClose} className={styles.cancel} disabled={loading}>
              Kapat
            </button>
          </div>
        </div>

        {/* ✅ Sonuç gösterimi */}
        {result && <pre className={styles.resultBox}>{result}</pre>}
      </div>
    </div>
  );
}
