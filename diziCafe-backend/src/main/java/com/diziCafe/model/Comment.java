package com.diziCafe.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Yorumu yapan kullanıcı
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Hangi filme yazıldı
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    // Yanıtsa: üst yorum (nullable olabilir)
    @ManyToOne
    @JoinColumn(name = "parent_id")
    @JsonBackReference // parent serileştirilirken replies üzerinden tekrar dönmesin
    private Comment parent;

    // Alt yorumlar (cevaplar)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // replies serialize edilsin ama parent tekrar dönmesin
    private List<Comment> replies;

    @Lob
    @Column(nullable = false)
    private String content;

    private LocalDateTime createdAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}
