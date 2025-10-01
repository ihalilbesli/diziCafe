package com.diziCafe.service.impl;

import com.diziCafe.model.Film;
import com.diziCafe.model.Rating;
import com.diziCafe.model.User;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.repository.RatingRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.RatingService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    @Override
    public Rating rateFilm(Long filmId, double score) {
        validateScore(score);

        User user = getCurrentUser();
        Film film = getFilmOrThrow(filmId);

        if (ratingRepository.findByUserAndFilm(user, film).isPresent()) {
            throw new RuntimeException("Bu filme zaten puan verdiniz.");
        }

        Rating rating = Rating.builder()
                .user(user)
                .film(film)
                .score(score) // artık Double
                .build();

        return ratingRepository.save(rating);
    }

    @Override
    public Rating updateRating(Long filmId, double newScore) {
        validateScore(newScore);

        User user = getCurrentUser();
        Film film = getFilmOrThrow(filmId);

        Rating rating = ratingRepository.findByUserAndFilm(user, film)
                .orElseThrow(() -> new RuntimeException("Bu filme henüz puan vermediniz."));

        rating.setScore(newScore);
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRating(Long filmId) {
        User user = getCurrentUser();
        Film film = getFilmOrThrow(filmId);

        Rating rating = ratingRepository.findByUserAndFilm(user, film)
                .orElseThrow(() -> new RuntimeException("Silinecek puan bulunamadı."));

        ratingRepository.delete(rating);
    }

    @Override
    public Double getAverageScore(Long filmId) {
        Film film = getFilmOrThrow(filmId);
        Double avg = ratingRepository.findAverageScoreByFilm(film);
        return avg != null ? avg : 0.0; // hiç oy yoksa 0 döner
    }

    @Override
    public Rating getMyRating(Long filmId) {
        User user = getCurrentUser();
        Film film = getFilmOrThrow(filmId);

        return ratingRepository.findByUserAndFilm(user, film)
                .orElseThrow(() -> new RuntimeException("Henüz bu filme puan vermediniz."));
    }

    private void validateScore(double score) {
        if (score < 0.5 || score > 5) {
            throw new RuntimeException("Puan 0.5 ile 5 arasında olmalıdır.");
        }
    }

    private User getCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı."));
    }

    private Film getFilmOrThrow(Long filmId) {
        return filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı."));
    }
}
