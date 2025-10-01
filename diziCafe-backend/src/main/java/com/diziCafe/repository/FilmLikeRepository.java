package com.diziCafe.repository;

import com.diziCafe.model.Film;
import com.diziCafe.model.FilmLike;
import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FilmLikeRepository extends JpaRepository<FilmLike, Long> {

    Optional<FilmLike> findByUserAndFilm(User user, Film film);

    long countByFilmAndType(Film film, FilmLike.LikeType type);

    void deleteByUserAndFilm(User user, Film film);

    boolean existsByUserAndFilmAndType(User user, Film film, FilmLike.LikeType type);

    List<FilmLike> findByUserAndType(User user, FilmLike.LikeType type);

}
