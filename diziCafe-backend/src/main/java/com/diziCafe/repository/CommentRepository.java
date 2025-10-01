package com.diziCafe.repository;

import com.diziCafe.model.Comment;
import com.diziCafe.model.Film;
import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Bir filmdeki üst yorumlar (parent null olanlar)
    List<Comment> findByFilmAndParentIsNullOrderByCreatedAtDesc(Film film);

    // Belirli bir yorumun cevapları
    List<Comment> findByParent(Comment parent);

    // Belirli bir kullanıcının yaptığı tüm yorumlar
    List<Comment> findByUser(User user);
}
