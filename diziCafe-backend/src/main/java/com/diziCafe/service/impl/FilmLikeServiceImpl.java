package com.diziCafe.service.impl;

import com.diziCafe.model.Film;
import com.diziCafe.model.FilmLike;
import com.diziCafe.model.User;
import com.diziCafe.repository.FilmLikeRepository;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.FilmLikeService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmLikeServiceImpl implements FilmLikeService {

    private final FilmLikeRepository filmLikeRepository;
    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void likeFilm(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        User user = getCurrentUser();

        removeReaction(filmId); // Öncekini sil

        FilmLike like = FilmLike.builder()
                .film(film)
                .user(user)
                .type(FilmLike.LikeType.LIKE)
                .build();
        filmLikeRepository.save(like);
    }

    @Override
    @Transactional
    public void dislikeFilm(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        User user = getCurrentUser();

        removeReaction(filmId); // Öncekini sil

        FilmLike dislike = FilmLike.builder()
                .film(film)
                .user(user)
                .type(FilmLike.LikeType.DISLIKE)
                .build();
        filmLikeRepository.save(dislike);
    }

    @Override
    @Transactional
    public void removeReaction(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        User user = getCurrentUser();
        filmLikeRepository.deleteByUserAndFilm(user, film);
    }

    @Override
    public boolean hasLiked(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        User user = getCurrentUser();
        return filmLikeRepository.existsByUserAndFilmAndType(user, film, FilmLike.LikeType.LIKE);
    }

    @Override
    public boolean hasDisliked(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        User user = getCurrentUser();
        return filmLikeRepository.existsByUserAndFilmAndType(user, film, FilmLike.LikeType.DISLIKE);
    }

    @Override
    public long getLikeCount(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        return filmLikeRepository.countByFilmAndType(film, FilmLike.LikeType.LIKE);
    }

    @Override
    public long getDislikeCount(Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
        return filmLikeRepository.countByFilmAndType(film, FilmLike.LikeType.DISLIKE);
    }

    private User getCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }
    @Override
    public List<Film> getUserLikedFilms() {
        User user = getCurrentUser();
        return filmLikeRepository.findByUserAndType(user, FilmLike.LikeType.LIKE)
                .stream()
                .map(FilmLike::getFilm)
                .toList();
    }

    @Override
    public List<Film> getUserDislikedFilms() {
        User user = getCurrentUser();
        return filmLikeRepository.findByUserAndType(user, FilmLike.LikeType.DISLIKE)
                .stream()
                .map(FilmLike::getFilm)
                .toList();
    }
}
