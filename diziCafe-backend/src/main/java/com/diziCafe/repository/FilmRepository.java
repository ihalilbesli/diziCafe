package com.diziCafe.repository;

import com.diziCafe.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FilmRepository extends JpaRepository<Film, Long> {

    Optional<Film> findByImdbId(String imdbId);

    List<Film> findByTitleContainingIgnoreCase(String title);

    List<Film> findByGenreContainingIgnoreCase(String genre);

    List<Film> findByDirectorContainingIgnoreCase(String director);

    List<Film> findByImdbRatingGreaterThanEqual(Double rating);
}
