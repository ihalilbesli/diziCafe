package com.diziCafe.service;

import com.diziCafe.model.Collection;

import java.util.List;

public interface CollectionService {

    void addToCollection(Long filmId, Collection.Status status);

    void removeFromCollection(Long filmId);

    List<Collection> getUserCollection(Collection.Status status);

    boolean isInCollection(Long filmId);
}
