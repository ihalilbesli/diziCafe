import { useEffect, useState } from "react";
import styles from "./CommentSection.module.css";
import {
  getFilmComments,
  addComment
} from "../../services/commentService";
import {
  likeComment,
  dislikeComment,
  removeReaction,
  hasUserLiked,
  hasUserDisliked,
  getLikeCount,
  getDislikeCount
} from "../../services/commentLikeService";
import { getToken } from "../../services/authService";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaRegThumbsDown
} from "react-icons/fa";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: { nickname: string };
  replies?: Comment[];
}

interface Props {
  filmId: number;
}

const CommentSection = ({ filmId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [dislikes, setDislikes] = useState<{ [key: number]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [userDislikes, setUserDislikes] = useState<{ [key: number]: boolean }>({});

  const fetchAll = async () => {
    try {
      const res = await getFilmComments(filmId);
      setComments(res.data);

      const likeMap: any = {};
      const dislikeMap: any = {};
      const userLikeMap: any = {};
      const userDislikeMap: any = {};

      for (let c of res.data) {
        const [lCount, dCount, liked, disliked] = await Promise.all([
          getLikeCount(c.id),
          getDislikeCount(c.id),
          hasUserLiked(c.id),
          hasUserDisliked(c.id)
        ]);
        likeMap[c.id] = lCount.data;
        dislikeMap[c.id] = dCount.data;
        userLikeMap[c.id] = liked.data;
        userDislikeMap[c.id] = disliked.data;
      }

      setLikes(likeMap);
      setDislikes(dislikeMap);
      setUserLikes(userLikeMap);
      setUserDislikes(userDislikeMap);
    } catch (e) {
      console.error("Yorumlar yüklenemedi", e);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [filmId]);

  const requireAuth = () => {
    if (!getToken()) {
      alert("Yorum yapmak için giriş yapmalısınız.");
      return false;
    }
    return true;
  };

  const handleAddComment = async () => {
    if (!requireAuth() || !newComment.trim()) return;
    await addComment(filmId, newComment);
    setNewComment("");
    fetchAll();
  };

  const handleReply = async (parentId: number) => {
    if (!requireAuth() || !replyContent[parentId]?.trim()) return;
    await addComment(filmId, replyContent[parentId], parentId);
    setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
    fetchAll();
  };

  const toggleLike = async (commentId: number) => {
    if (!requireAuth()) return;
    if (userLikes[commentId]) await removeReaction(commentId);
    else {
      if (userDislikes[commentId]) await removeReaction(commentId);
      await likeComment(commentId);
    }
    fetchAll();
  };

  const toggleDislike = async (commentId: number) => {
    if (!requireAuth()) return;
    if (userDislikes[commentId]) await removeReaction(commentId);
    else {
      if (userLikes[commentId]) await removeReaction(commentId);
      await dislikeComment(commentId);
    }
    fetchAll();
  };

  // Tarihi formatla (örn. 9 Ekim 2023)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.commentSection}>
      <h3>Yorumlar</h3>

      {comments.length === 0 && <p>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>}

      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.commentHeader}>
            <div className={styles.userInfo}>
              <strong>{comment.user.nickname}</strong>
              <span className={styles.date}>{formatDate(comment.createdAt)}</span>
            </div>
            <div className={styles.actions}> ... </div>
          </div>
          <p>{comment.content}</p>

          <div className={styles.actions}>
            {userLikes[comment.id] ? (
              <FaHeart onClick={() => toggleLike(comment.id)} />
            ) : (
              <FaRegHeart onClick={() => toggleLike(comment.id)} />
            )}
            <span>{likes[comment.id] ?? 0}</span>

            {userDislikes[comment.id] ? (
              <FaThumbsDown onClick={() => toggleDislike(comment.id)} />
            ) : (
              <FaRegThumbsDown onClick={() => toggleDislike(comment.id)} />
            )}
            <span>{dislikes[comment.id] ?? 0}</span>
          </div>

          <div className={styles.replySection}>
            {comment.replies?.map((reply) => (
              <div key={reply.id} className={styles.reply}>
                <div className={styles.commentHeader}>
                  <strong>{reply.user.nickname}</strong>
                  <span className={styles.date}>{formatDate(reply.createdAt)}</span>
                </div>
                <p>{reply.content}</p>
              </div>
            ))}

            <input
              type="text"
              placeholder="Yanıtla..."
              value={replyContent[comment.id] || ""}
              onChange={(e) =>
                setReplyContent((prev) => ({ ...prev, [comment.id]: e.target.value }))
              }
            />
            <button onClick={() => handleReply(comment.id)}>Gönder</button>
          </div>
        </div>
      ))}

      <div className={styles.addComment}>
        <textarea
          placeholder="Yorumunuzu yazın..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleAddComment}>Yorum Yap</button>
      </div>
    </div>
  );
};

export default CommentSection;
