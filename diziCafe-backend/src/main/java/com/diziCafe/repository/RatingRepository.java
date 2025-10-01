package com.diziCafe.repository;

import com.diziCafe.model.Film;
import com.diziCafe.model.Rating;
import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserAndFilm(User user, Film film);

    List<Rating> findByFilm(Film film);

    List<Rating> findByUser(User user);

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.film = :film")
    Double findAverageScoreByFilm(Film film);
}
