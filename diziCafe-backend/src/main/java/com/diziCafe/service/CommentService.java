package com.diziCafe.service;

import com.diziCafe.model.Comment;

import java.util.List;

public interface CommentService {

    Comment addComment(Long filmId, String content, Long parentId);

    Comment updateComment(Long commentId, String newContent);

    void deleteComment(Long commentId);

    List<Comment> getFilmComments(Long filmId);

    List<Comment> getReplies(Long parentId);

    List<Comment> getMyComments();


}
