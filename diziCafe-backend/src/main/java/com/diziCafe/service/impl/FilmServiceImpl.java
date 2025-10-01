package com.diziCafe.service.impl;

import com.diziCafe.model.Film;
import com.diziCafe.model.User;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.FilmService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FilmServiceImpl implements FilmService {

    private final FilmRepository filmRepository;
    private final UserRepository userRepository;


    @Override
    public Film updateFilm(Long id, Film updatedFilm) {
        User user = getCurrentUserOrThrow();
        if (user.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Sadece admin kullanıcı film güncelleyebilir.");
        }

        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));

        film.setTitle(updatedFilm.getTitle());
        film.setDescription(updatedFilm.getDescription());
        film.setDirector(updatedFilm.getDirector());
        film.setYear(updatedFilm.getYear());
        film.setGenre(updatedFilm.getGenre());
        film.setImdbRating(updatedFilm.getImdbRating());
        film.setPosterUrl(updatedFilm.getPosterUrl());

        return filmRepository.save(film);
    }

    @Override
    public void deleteFilm(Long id) {
        User user = getCurrentUserOrThrow();
        if (user.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Sadece admin kullanıcı film silebilir.");
        }

        filmRepository.deleteById(id);
    }

    @Override
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    @Override
    public Film getFilmById(Long id) {
        return filmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
    }

    @Override
    public List<Film> searchFilms(String title, String genre, String director, Double minRating) {
        // Basit arama mantığı (birden çok filtre için custom sorgular yazılabilir)
        if (title != null) {
            return filmRepository.findByTitleContainingIgnoreCase(title);
        } else if (genre != null) {
            return filmRepository.findByGenreContainingIgnoreCase(genre);
        } else if (director != null) {
            return filmRepository.findByDirectorContainingIgnoreCase(director);
        } else if (minRating != null) {
            return filmRepository.findByImdbRatingGreaterThanEqual(minRating);
        } else {
            return filmRepository.findAll();
        }
    }

    private User getCurrentUserOrThrow() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    @Override
    public Page<Film> getAllFilms(Pageable pageable) {
        return filmRepository.findAll(pageable);
    }
}
