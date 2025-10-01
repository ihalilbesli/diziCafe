package com.diziCafe.service.impl;

import com.diziCafe.dto.OmdbFilmResponse;
import com.diziCafe.model.Film;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.service.OmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OmdbServiceImpl implements OmdbService {

    private final FilmRepository filmRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${omdb.api.key}")
    private String omdbApiKey;

    @Override
    public String fetchAndSaveFilm(String imdbId) {
        if (filmRepository.findByImdbId(imdbId).isPresent()) {
            return "Bu IMDb ID veritabanında zaten mevcut.";
        }

        String url = "http://www.omdbapi.com/?i=" + imdbId + "&apikey=" + omdbApiKey;
        OmdbFilmResponse response = restTemplate.getForObject(url, OmdbFilmResponse.class);

        if (response == null || response.getResponse().equals("False")) {
            return "Film alınamadı: " + (response != null ? response.getError() : "Hata");
        }

        Film film = Film.builder()
                .imdbId(response.getImdbId())
                .title(response.getTitle())
                .description(response.getDescription())
                .year(response.getYear())
                .genre(response.getGenre())
                .director(response.getDirector())
                .posterUrl(response.getPosterUrl())
                .imdbRating(parseDoubleSafe(response.getImdbRating()))
                .build();

        filmRepository.save(film);
        return "Film başarıyla kaydedildi.";
    }
    @Override
    public List<String> fetchAndSaveMultiple(List<String> imdbIds) {
        List<String> results = new ArrayList<>();
        for (String imdbId : imdbIds) {
            String result = fetchAndSaveFilm(imdbId); // mevcut olan metodu
            results.add(imdbId + ": " + result);
        }
        return results;
    }


    private Double parseDoubleSafe(String rating) {
        try {
            return Double.parseDouble(rating);
        } catch (Exception e) {
            return null;
        }
    }
}
