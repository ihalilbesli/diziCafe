package com.diziCafe.service.impl;

import com.diziCafe.model.Comment;
import com.diziCafe.model.Film;
import com.diziCafe.model.User;
import com.diziCafe.repository.CommentRepository;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.CommentService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    @Override
    public Comment addComment(Long filmId, String content, Long parentId) {
        User user = getCurrentUser();
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı."));

        Comment parent = null;
        if (parentId != null) {
            parent = commentRepository.findById(parentId)
                    .orElseThrow(() -> new RuntimeException("Yanıtlanacak yorum bulunamadı."));
        }

        Comment comment = Comment.builder()
                .user(user)
                .film(film)
                .parent(parent)
                .content(content)
                .build();

        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Long commentId, String newContent) {
        User user = getCurrentUser();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı."));

        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Sadece kendi yorumunuzu güncelleyebilirsiniz.");
        }

        comment.setContent(newContent);
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        User user = getCurrentUser();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Yorum bulunamadı."));

        if (!comment.getUser().getId().equals(user.getId()) &&
                user.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Yorumu silmeye yetkiniz yok.");
        }

        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> getFilmComments(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı."));

        return commentRepository.findByFilmAndParentIsNullOrderByCreatedAtDesc(film);
    }

    @Override
    public List<Comment> getReplies(Long parentId) {
        Comment parent = commentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Üst yorum bulunamadı."));

        return commentRepository.findByParent(parent);
    }

    private User getCurrentUser() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));
    }

    @Override
    public List<Comment> getMyComments() {
        User user = getCurrentUser();
        return commentRepository.findByUser(user);
    }
}
