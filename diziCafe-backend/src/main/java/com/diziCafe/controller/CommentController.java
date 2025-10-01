package com.diziCafe.controller;

import com.diziCafe.model.Comment;
import com.diziCafe.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    //  Yorum ekle (film'e yorum veya başka yoruma yanıt)
    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(
            @RequestParam Long filmId,
            @RequestParam String content,
            @RequestParam(required = false) Long parentId
    ) {
        return ResponseEntity.ok(commentService.addComment(filmId, content, parentId));
    }

    //  Yorumu güncelle
    @PutMapping("/update/{commentId}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long commentId,
            @RequestParam String newContent
    ) {
        return ResponseEntity.ok(commentService.updateComment(commentId, newContent));
    }

    //  Yorumu sil
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Yorum silindi.");
    }

    //  Film'in tüm üst yorumlarını getir
    @GetMapping("/film/{filmId}")
    public ResponseEntity<List<Comment>> getFilmComments(@PathVariable Long filmId) {
        return ResponseEntity.ok(commentService.getFilmComments(filmId));
    }

    //  Bir yorumun alt cevaplarını getir
    @GetMapping("/replies/{parentId}")
    public ResponseEntity<List<Comment>> getReplies(@PathVariable Long parentId) {
        return ResponseEntity.ok(commentService.getReplies(parentId));
    }

    @GetMapping("/my-comments")
    public ResponseEntity<List<Comment>> getMyComments() {
        return ResponseEntity.ok(commentService.getMyComments());
    }

}
