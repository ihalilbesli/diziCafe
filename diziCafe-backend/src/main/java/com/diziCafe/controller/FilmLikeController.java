package com.diziCafe.controller;

import com.diziCafe.model.Film;
import com.diziCafe.service.FilmLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/film-likes")
@RequiredArgsConstructor
public class FilmLikeController {

    private final FilmLikeService filmLikeService;

    @PostMapping("/like/{filmId}")
    public ResponseEntity<String> likeFilm(@PathVariable Long filmId) {
        filmLikeService.likeFilm(filmId);
        return ResponseEntity.ok("Film beğenildi");
    }

    @PostMapping("/dislike/{filmId}")
    public ResponseEntity<String> dislikeFilm(@PathVariable Long filmId) {
        filmLikeService.dislikeFilm(filmId);
        return ResponseEntity.ok("Film beğenilmedi");
    }

    @DeleteMapping("/remove/{filmId}")
    public ResponseEntity<String> removeReaction(@PathVariable Long filmId) {
        filmLikeService.removeReaction(filmId);
        return ResponseEntity.ok("Tepki kaldırıldı");
    }

    @GetMapping("/hasLiked/{filmId}")
    public ResponseEntity<Boolean> hasLiked(@PathVariable Long filmId) {
        return ResponseEntity.ok(filmLikeService.hasLiked(filmId));
    }

    @GetMapping("/hasDisliked/{filmId}")
    public ResponseEntity<Boolean> hasDisliked(@PathVariable Long filmId) {
        return ResponseEntity.ok(filmLikeService.hasDisliked(filmId));
    }

    @GetMapping("/likeCount/{filmId}")
    public ResponseEntity<Long> getLikeCount(@PathVariable Long filmId) {
        return ResponseEntity.ok(filmLikeService.getLikeCount(filmId));
    }

    @GetMapping("/dislikeCount/{filmId}")
    public ResponseEntity<Long> getDislikeCount(@PathVariable Long filmId) {
        return ResponseEntity.ok(filmLikeService.getDislikeCount(filmId));
    }
    @GetMapping("/my-likes")
    public ResponseEntity<List<Film>> getMyLikedFilms() {
        return ResponseEntity.ok(filmLikeService.getUserLikedFilms());
    }

    @GetMapping("/my-dislikes")
    public ResponseEntity<List<Film>> getMyDislikedFilms() {
        return ResponseEntity.ok(filmLikeService.getUserDislikedFilms());
    }
}
