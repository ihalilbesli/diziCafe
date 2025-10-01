package com.diziCafe.service;

import com.diziCafe.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface FilmService {


    Film updateFilm(Long id, Film updatedFilm);

    void deleteFilm(Long id);

    List<Film> getAllFilms();

    Film getFilmById(Long id);

    List<Film> searchFilms(String title, String genre, String director, Double minRating);

    Page<Film> getAllFilms(Pageable pageable);

}
