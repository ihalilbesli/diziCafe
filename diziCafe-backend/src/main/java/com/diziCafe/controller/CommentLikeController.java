package com.diziCafe.controller;

import com.diziCafe.service.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diziCafe/comment-likes")
@RequiredArgsConstructor
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    //  Beğeni
    @PostMapping("/like/{commentId}")
    public ResponseEntity<?> likeComment(@PathVariable Long commentId) {
        commentLikeService.likeComment(commentId);
        return ResponseEntity.ok("Yorum beğenildi");
    }

    //  Beğenmeme
    @PostMapping("/dislike/{commentId}")
    public ResponseEntity<?> dislikeComment(@PathVariable Long commentId) {
        commentLikeService.dislikeComment(commentId);
        return ResponseEntity.ok("Yorum beğenilmedi");
    }

    //  Beğeni / Beğenmeme kaldır
    @DeleteMapping("/remove/{commentId}")
    public ResponseEntity<?> removeReaction(@PathVariable Long commentId) {
        commentLikeService.removeReaction(commentId);
        return ResponseEntity.ok("Tepki kaldırıldı");
    }

    //  Beğeni kontrolü
    @GetMapping("/hasLiked/{commentId}")
    public ResponseEntity<Boolean> hasUserLiked(@PathVariable Long commentId) {
        return ResponseEntity.ok(commentLikeService.hasUserLiked(commentId));
    }

    //  Dislike kontrolü
    @GetMapping("/hasDisliked/{commentId}")
    public ResponseEntity<Boolean> hasUserDisliked(@PathVariable Long commentId) {
        return ResponseEntity.ok(commentLikeService.hasUserDisliked(commentId));
    }

    //  beğeni Sayı
    @GetMapping("/likeCount/{commentId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long commentId) {
        return ResponseEntity.ok(commentLikeService.getLikeCount(commentId));
    }

    // dislike  Sayı
    @GetMapping("/dislikeCount/{commentId}")
    public ResponseEntity<Long> getDislikeCount(@PathVariable Long commentId) {
        return ResponseEntity.ok(commentLikeService.getDislikeCount(commentId));
    }
}
