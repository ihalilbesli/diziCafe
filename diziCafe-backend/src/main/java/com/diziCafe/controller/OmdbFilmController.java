package com.diziCafe.controller;

import com.diziCafe.service.OmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/films")
@RequiredArgsConstructor
public class OmdbFilmController {

    private final OmdbService omdbService;

    // Tek bir IMDb ID ile film ekleme
    // Örnek: /diziCafe/films/fetch?imdbId=tt1375666
    @PostMapping("/fetch")
    public ResponseEntity<String> fetchAndSaveFilm(@RequestParam String imdbId) {
        String result = omdbService.fetchAndSaveFilm(imdbId);
        return ResponseEntity.ok(result);
    }

    // Çoklu IMDb ID listesi ile film ekleme
    @PostMapping("/fetch-multiple")
    public ResponseEntity<List<String>> fetchMultiple(@RequestBody List<String> imdbIds) {
        List<String> results = omdbService.fetchAndSaveMultiple(imdbIds);
        return ResponseEntity.ok(results);
    }
}
