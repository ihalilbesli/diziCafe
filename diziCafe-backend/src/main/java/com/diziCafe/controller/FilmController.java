package com.diziCafe.controller;

import com.diziCafe.model.Film;
import com.diziCafe.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/films")
@RequiredArgsConstructor
public class FilmController {

    private final FilmService filmService;

    //  Film ekle (sadece ADMIN)
    @PostMapping("/add")
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        return ResponseEntity.ok(filmService.addFilm(film));
    }

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
}
