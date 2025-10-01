package com.diziCafe.service.impl;

import com.diziCafe.model.Comment;
import com.diziCafe.model.CommentLike;
import com.diziCafe.model.CommentLike.LikeType;
import com.diziCafe.model.User;
import com.diziCafe.repository.CommentLikeRepository;
import com.diziCafe.repository.CommentRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.CommentLikeService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentLikeServiceImpl implements CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Override
    public void likeComment(Long commentId) {
        saveOrUpdateReaction(commentId, LikeType.LIKE);
    }

    @Override
    public void dislikeComment(Long commentId) {
        saveOrUpdateReaction(commentId, LikeType.DISLIKE);
    }

    @Override
    public void removeReaction(Long commentId) {
        User user = getCurrentUser();
        Comment comment = getComment(commentId);
        commentLikeRepository.deleteByUserAndComment(user, comment);
    }

    @Override
    public boolean hasUserLiked(Long commentId) {
        return hasReaction(commentId, LikeType.LIKE);
    }

    @Override
    public boolean hasUserDisliked(Long commentId) {
        return hasReaction(commentId, LikeType.DISLIKE);
    }

    @Override
    public Long getLikeCount(Long commentId) {
        return getReactionCount(commentId, LikeType.LIKE);
    }

    @Override
    public Long getDislikeCount(Long commentId) {
        return getReactionCount(commentId, LikeType.DISLIKE);
    }

    // Yardımcı metotlar

    private void saveOrUpdateReaction(Long commentId, LikeType type) {
        User user = getCurrentUser();
        Comment comment = getComment(commentId);

        CommentLike like = commentLikeRepository.findByUserAndComment(user, comment)
                .orElse(CommentLike.builder()
                        .user(user)
                        .comment(comment)
                        .build());

        like.setType(type);
        commentLikeRepository.save(like);
    }

    private boolean hasReaction(Long commentId, LikeType type) {
        User user = getCurrentUser();
        Comment comment = getComment(commentId);

        return commentLikeRepository.findByUserAndComment(user, comment)
                .filter(like -> like.getType() == type)
                .isPresent();
    }

    private Long getReactionCount(Long commentId, LikeType type) {
        Comment comment = getComment(commentId);
        return commentLikeRepository.countByCommentAndType(comment, type);
    }

    private User getCurrentUser() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));
    }

    private Comment getComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı."));
    }
}
