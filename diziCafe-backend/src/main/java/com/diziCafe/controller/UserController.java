package com.diziCafe.controller;

import com.diziCafe.model.User;
import com.diziCafe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diziCafe/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //  Giriş yapan kullanıcı bilgisi
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    //  Sadece admin tüm kullanıcıları görebilir
    @GetMapping
    public ResponseEntity<List<User>> getAllUsersIfAdmin() {
        return ResponseEntity.ok(userService.getAllUsersIfAdmin());
    }

    //  Sadece admin kullanıcı siler
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("Kullanıcı silindi.");
    }

    // Kendi profili veya adminse başka bir kullanıcıyı günceller
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser));
    }
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long id,
            @RequestParam String oldPassword,
            @RequestParam String newPassword
    ) {
        userService.changePassword(id, oldPassword, newPassword);
        return ResponseEntity.ok("Şifre başarıyla güncellendi.");
    }

}
