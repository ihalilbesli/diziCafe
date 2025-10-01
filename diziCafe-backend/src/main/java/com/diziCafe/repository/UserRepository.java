package com.diziCafe.repository;

import com.diziCafe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByEmailOrNickname(String email, String nickname);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    List<User> findByBanned(boolean banned);

}
