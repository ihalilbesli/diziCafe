package com.diziCafe.controller;

import com.diziCafe.model.Film;
import com.diziCafe.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;


import java.util.List;

@RestController
@RequestMapping("/diziCafe/films")
@RequiredArgsConstructor
public class FilmController {

    private final FilmService filmService;


    // ️ Film güncelle (sadece ADMIN)
    @PutMapping("/update/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film updatedFilm) {
        return ResponseEntity.ok(filmService.updateFilm(id, updatedFilm));
    }

    //  Film sil (sadece ADMIN)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFilm(@PathVariable Long id) {
        filmService.deleteFilm(id);
        return ResponseEntity.ok("Film silindi.");
    }

    //  Tüm filmleri getir
    @GetMapping("/all")
    public ResponseEntity<List<Film>> getAllFilms() {
        return ResponseEntity.ok(filmService.getAllFilms());
    }

    //  Film detay (id ile)
    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        return ResponseEntity.ok(filmService.getFilmById(id));
    }

    //  Arama (title, genre, director, minRating gibi sorgu parametreleri)
    @GetMapping("/search")
    public ResponseEntity<List<Film>> searchFilms(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String director,
            @RequestParam(required = false) Double minRating
    ) {
        return ResponseEntity.ok(filmService.searchFilms(title, genre, director, minRating));
    }

    @GetMapping
    public ResponseEntity<Page<Film>> getAllFilms(
            @RequestParam(defaultValue = "0") int page,   // hangi sayfa
            @RequestParam(defaultValue = "24") int size   // her sayfada kaç film
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(filmService.getAllFilms(pageable));
    }
}
