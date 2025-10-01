package com.diziCafe.repository;

import com.diziCafe.model.Collection;
import com.diziCafe.model.Collection.Status;
import com.diziCafe.model.Film;
import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    // Kullanıcı belirli bir filmi koleksiyonuna eklemiş mi?
    Optional<Collection> findByUserAndFilm(User user, Film film);

    // Kullanıcının tüm koleksiyonları
    List<Collection> findByUser(User user);

    // Kullanıcının belirli bir statüye göre koleksiyonu
    List<Collection> findByUserAndStatus(User user, Status status);

    // Kayıt silmek için
    void deleteByUserAndFilm(User user, Film film);
}
