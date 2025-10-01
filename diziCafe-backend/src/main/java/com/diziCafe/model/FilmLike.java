package com.diziCafe.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "film_likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "film_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilmLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Beğenen kullanıcı
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Beğenilen film
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LikeType type; // LIKE veya DISLIKE

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public enum LikeType {
        LIKE,
        DISLIKE
    }
}
