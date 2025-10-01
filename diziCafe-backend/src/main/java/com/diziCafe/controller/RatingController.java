package com.diziCafe.controller;

import com.diziCafe.model.Rating;
import com.diziCafe.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diziCafe/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    // 🎬 Filme puan ver (0.5 - 5 arası olabilir)
    @PostMapping("/{filmId}")
    public ResponseEntity<Rating> rateFilm(
            @PathVariable Long filmId,
            @RequestParam double score
    ) {
        return ResponseEntity.ok(ratingService.rateFilm(filmId, score));
    }

    // ✏️ Puan güncelle (0.5 - 5 arası olabilir)
    @PutMapping("/{filmId}")
    public ResponseEntity<Rating> updateRating(
            @PathVariable Long filmId,
            @RequestParam double newScore
    ) {
        return ResponseEntity.ok(ratingService.updateRating(filmId, newScore));
    }

    // ❌ Puan sil
    @DeleteMapping("/{filmId}")
    public ResponseEntity<String> deleteRating(@PathVariable Long filmId) {
        ratingService.deleteRating(filmId);
        return ResponseEntity.ok("Puan silindi.");
    }

    // 📊 Ortalama puanı getir
    @GetMapping("/{filmId}/average")
    public ResponseEntity<Double> getAverageScore(@PathVariable Long filmId) {
        return ResponseEntity.ok(ratingService.getAverageScore(filmId));
    }

    // 👤 Kullanıcının kendi puanını getir
    @GetMapping("/{filmId}/my-rating")
    public ResponseEntity<Rating> getMyRating(@PathVariable Long filmId) {
        return ResponseEntity.ok(ratingService.getMyRating(filmId));
    }
}
