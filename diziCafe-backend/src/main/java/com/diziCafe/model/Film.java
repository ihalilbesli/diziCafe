package com.diziCafe.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "films")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // IMDb'den veri çekmek için eşleşecek benzersiz ID
    @Column(unique = true)
    private String imdbId;

    @Column(nullable = false)
    private String title;

    @Lob
    private String description;

    private String year;

    private String genre;

    private String director;

    private Double imdbRating;

    private String posterUrl;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
