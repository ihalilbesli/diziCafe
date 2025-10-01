import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ eklendi
import styles from "./AdminComments.module.css";
import { getAllComments, deleteComment } from "../../services/commentService";
import { getLikeCount, getDislikeCount } from "../../services/commentLikeService";
import { FaTrash } from "react-icons/fa";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  film: { id: number; title: string };   // ✅ id eklendi
  user: { nickname: string; fullName: string };
};

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [dislikes, setDislikes] = useState<{ [key: number]: number }>({});

  const fetchComments = async () => {
    try {
      const res = await getAllComments();
      const data: Comment[] = res.data;
      setComments(data);

      // her yorum için like/dislike sayılarını çek
      data.forEach(async (c) => {
        const likeRes = await getLikeCount(c.id);
        const dislikeRes = await getDislikeCount(c.id);
        setLikes((prev) => ({ ...prev, [c.id]: likeRes.data }));
        setDislikes((prev) => ({ ...prev, [c.id]: dislikeRes.data }));
      });
    } catch (err) {
      console.error("Yorumlar alınırken hata:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      try {
        await deleteComment(id);
        setComments(comments.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Yorum silinirken hata:", err);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Yorum Yönetimi</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Film</th>
            <th>Yorum</th>
            <th>Tarih</th>
            <th>👍</th>
            <th>👎</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.user?.nickname || c.user?.fullName}</td>

              {/* ✅ Film ismine tıklayınca detay sayfasına gitsin */}
              <td>
                <Link to={`/films/${c.film?.id}`} className={styles.filmLink}>
                  {c.film?.title}
                </Link>
              </td>

              <td>{c.content}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
              <td>{likes[c.id] ?? 0}</td>
              <td>{dislikes[c.id] ?? 0}</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(c.id)}
                >
                  <FaTrash /> Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
