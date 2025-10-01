package com.diziCafe.service.impl;

import com.diziCafe.model.User;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.service.UserService;
import com.diziCafe.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    //  Oturum açmış kullanıcı bilgisi
    @Override
    public User getCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));
    }

    //  Adminse tüm kullanıcıları getir
    @Override
    public List<User> getAllUsersIfAdmin() {
        User currentUser = getCurrentUser();
        if (currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Sadece admin kullanıcılar tüm kullanıcıları görebilir.");
        }
        return userRepository.findAll();
    }

    //  Kullanıcı silme (admin kontrolü içerir)
    @Override
    public void deleteUserById(Long id) {
        User currentUser = getCurrentUser();
        if (currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Sadece admin kullanıcılar silme işlemi yapabilir.");
        }
        userRepository.deleteById(id);
    }

    //  Kendi profilini güncelleme
    @Override
    public User updateUser(Long id, User updatedUser) {
        User currentUser = getCurrentUser();
        if (!currentUser.getId().equals(id) && currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Kendi hesabınızı veya adminseniz başkasının hesabını güncelleyebilirsiniz.");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // Eğer email değiştiriliyorsa kontrol et
        if (!user.getEmail().equals(updatedUser.getEmail()) &&
                userRepository.existsByEmail(updatedUser.getEmail())) {
            throw new RuntimeException("Bu email zaten kullanımda.");
        }

        // Eğer nickname değiştiriliyorsa kontrol et
        if (!user.getNickname().equals(updatedUser.getNickname()) &&
                userRepository.existsByNickname(updatedUser.getNickname())) {
            throw new RuntimeException("Bu kullanıcı adı zaten kullanımda.");
        }

        user.setFullName(updatedUser.getFullName());
        user.setGender(updatedUser.getGender());
        user.setBirthDate(updatedUser.getBirthDate());
        user.setNickname(updatedUser.getNickname());
        user.setEmail(updatedUser.getEmail());

        return userRepository.save(user);
    }


    @Override
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // Eski şifreyi hash üzerinden kontrol et
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Eski şifre yanlış.");
        }

        // Yeni şifreyi hashleyerek kaydet
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    @Override
    public User toggleBanUser(Long id) {
        User currentUser = getCurrentUser();
        if (currentUser.getRole() != User.Role.ADMIN) {
            throw new RuntimeException("Sadece admin kullanıcılar ban işlemi yapabilir.");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // Admin kendini banlayamasın
        if (user.getId().equals(currentUser.getId())) {
            throw new RuntimeException("Kendi hesabınızı banlayamazsınız.");
        }

        user.setBanned(!user.isBanned()); // toggle ban
        return userRepository.save(user);
    }



}
