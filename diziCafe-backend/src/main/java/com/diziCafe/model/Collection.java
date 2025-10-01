package com.diziCafe.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "collections", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "film_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Listeyi oluşturan kullanıcı
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Eklenen film
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    // Kullanıcının bu filmi izleme durumu
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public enum Status {
        IZLEDIKLERIM,        // İzledim
        IZLEMEK_ISTEDIKLERIM        // İzlemek istiyorum
    }
}
