package com.diziCafe.service.impl;

import com.diziCafe.model.Collection;
import com.diziCafe.model.Film;
import com.diziCafe.model.User;
import com.diziCafe.repository.CollectionRepository;
import com.diziCafe.repository.FilmRepository;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.CollectionService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;
    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    @Override
    public void addToCollection(Long filmId, Collection.Status status) {
        User user = getCurrentUser();
        Film film = getFilm(filmId);

        // Aynı film daha önce eklendiyse güncelle
        Collection collection = collectionRepository.findByUserAndFilm(user, film)
                .orElse(Collection.builder()
                        .user(user)
                        .film(film)
                        .build());

        collection.setStatus(status);
        collectionRepository.save(collection);
    }

    @Override
    public void removeFromCollection(Long filmId) {
        User user = getCurrentUser();
        Film film = getFilm(filmId);

        collectionRepository.deleteByUserAndFilm(user, film);
    }

    @Override
    public List<Collection> getUserCollection(Collection.Status status) {
        User user = getCurrentUser();
        return collectionRepository.findByUserAndStatus(user, status);
    }

    @Override
    public boolean isInCollection(Long filmId) {
        User user = getCurrentUser();
        Film film = getFilm(filmId);
        return collectionRepository.findByUserAndFilm(user, film).isPresent();
    }

    private User getCurrentUser() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    private Film getFilm(Long filmId) {
        return filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film bulunamadı"));
    }
}
