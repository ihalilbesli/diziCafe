package com.diziCafe.service;

import com.diziCafe.model.Rating;

public interface RatingService {

    Rating rateFilm(Long filmId, double score);

    Rating updateRating(Long filmId, double newScore);

    void deleteRating(Long filmId);

    Double getAverageScore(Long filmId);

    Rating getMyRating(Long filmId);
}

