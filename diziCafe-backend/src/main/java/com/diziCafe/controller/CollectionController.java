package com.diziCafe.controller;

import com.diziCafe.model.Collection;
import com.diziCafe.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    //  Koleksiyona film ekle veya güncelle (izlediklerim / izlemek istediklerim)
    @PostMapping("/{filmId}")
    public ResponseEntity<String> addToCollection(
            @PathVariable Long filmId,
            @RequestParam Collection.Status status
    ) {
        collectionService.addToCollection(filmId, status);
        return ResponseEntity.ok("Film koleksiyona eklendi/güncellendi.");
    }

    //  Koleksiyondan film çıkar
    @DeleteMapping("/{filmId}")
    public ResponseEntity<String> removeFromCollection(@PathVariable Long filmId) {
        collectionService.removeFromCollection(filmId);
        return ResponseEntity.ok("Film koleksiyondan çıkarıldı.");
    }

    //  Kullanıcının koleksiyonunu listele (belirli statüye göre)
    @GetMapping
    public ResponseEntity<List<Collection>> getUserCollection(@RequestParam Collection.Status status) {
        return ResponseEntity.ok(collectionService.getUserCollection(status));
    }

    // Film koleksiyonda mı?
    @GetMapping("/{filmId}/exists")
    public ResponseEntity<Boolean> isInCollection(@PathVariable Long filmId) {
        return ResponseEntity.ok(collectionService.isInCollection(filmId));
    }
}
