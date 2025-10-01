package com.diziCafe.service;

public interface CommentLikeService {

    void likeComment(Long commentId);      // 👍
    void dislikeComment(Long commentId);   // 👎

    void removeReaction(Long commentId);   // Her iki tür için silme

    boolean hasUserLiked(Long commentId);
    boolean hasUserDisliked(Long commentId);

    Long getLikeCount(Long commentId);
    Long getDislikeCount(Long commentId);
}
