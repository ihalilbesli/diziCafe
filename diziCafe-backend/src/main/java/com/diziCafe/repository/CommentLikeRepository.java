package com.diziCafe.repository;

import com.diziCafe.model.Comment;
import com.diziCafe.model.CommentLike;
import com.diziCafe.model.CommentLike.LikeType;
import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByUserAndComment(User user, Comment comment);

    List<CommentLike> findByComment(Comment comment);

    List<CommentLike> findByUser(User user);

    Long countByCommentAndType(Comment comment, LikeType type); // 👍 veya 👎 sayısı

    void deleteByUserAndComment(User user, Comment comment);
}
