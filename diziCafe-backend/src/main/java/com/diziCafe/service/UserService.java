package com.diziCafe.service;

import com.diziCafe.model.User;

import java.util.List;

public interface UserService {

    User getCurrentUser();

    List<User> getAllUsersIfAdmin();

    void deleteUserById(Long id);

    User updateUser(Long id, User updatedUser);

    void changePassword(Long userId, String oldPassword, String newPassword);

    User toggleBanUser(Long id);

}
