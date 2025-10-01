package com.diziCafe.service;

import com.diziCafe.model.Film;
import com.diziCafe.model.FilmLike;

import java.util.List;

public interface FilmLikeService {

    void likeFilm(Long filmId);

    void dislikeFilm(Long filmId);

    void removeReaction(Long filmId);

    boolean hasLiked(Long filmId);

    boolean hasDisliked(Long filmId);

    long getLikeCount(Long filmId);

    long getDislikeCount(Long filmId);

    List<Film> getUserLikedFilms();

    List<Film> getUserDislikedFilms();
}
