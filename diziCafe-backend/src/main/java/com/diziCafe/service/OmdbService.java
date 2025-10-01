package com.diziCafe.service;

import java.util.List;

public interface OmdbService {
    String fetchAndSaveFilm(String imdbId);

    List<String> fetchAndSaveMultiple(List<String> imdbIds);


}
