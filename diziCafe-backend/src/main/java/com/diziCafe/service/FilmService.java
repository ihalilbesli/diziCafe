package com.diziCafe.service;

import com.diziCafe.model.Film;

import java.util.List;

public interface FilmService {

    Film addFilm(Film film);

    Film updateFilm(Long id, Film updatedFilm);

    void deleteFilm(Long id);

    List<Film> getAllFilms();

    Film getFilmById(Long id);

    List<Film> searchFilms(String title, String genre, String director, Double minRating);
}
