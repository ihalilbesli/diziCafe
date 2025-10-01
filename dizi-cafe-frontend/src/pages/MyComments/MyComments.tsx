import { useEffect, useState } from "react";
import styles from "./MyComments.module.css";
import { getMyComments } from "../../services/commentService";
import { useNavigate } from "react-router-dom";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  film: {
    id: number;
    title: string;
    posterUrl: string;
  };
}

export default function MyComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getMyComments();
        setComments(res.data);
      } catch (e) {
        console.error("Yorumlar alınamadı", e);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Yorumlarım</h2>

      {comments.length === 0 ? (
        <p className={styles.empty}>Henüz hiç yorum yapmadınız.</p>
      ) : (
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <img
                src={comment.film.posterUrl}
                alt={comment.film.title}
                className={styles.poster}
              />
              <div className={styles.info}>
                <h3>{comment.film.title}</h3>
                <p className={styles.content}>{comment.content}</p>
                <p className={styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <button
                  className={styles.button}
                  onClick={() => navigate(`/films/${comment.film.id}`)}
                >
                  Filme Git
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
