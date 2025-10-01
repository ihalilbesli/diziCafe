package com.diziCafe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OmdbFilmResponse {

    @JsonProperty("imdbID")
    private String imdbId;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Plot")
    private String description;

    @JsonProperty("Year")
    private String year;

    @JsonProperty("Genre")
    private String genre;

    @JsonProperty("Director")
    private String director;

    @JsonProperty("imdbRating")
    private String imdbRating; // API'den String gelir, Double'a çevireceğiz

    @JsonProperty("Poster")
    private String posterUrl;

    @JsonProperty("Response")
    private String response;

    @JsonProperty("Error")
    private String error;
}
