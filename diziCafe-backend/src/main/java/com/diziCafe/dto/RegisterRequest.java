package com.diziCafe.dto;

import com.diziCafe.model.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {

    private String fullName;
    private String nickname;
    private String email;
    private String password;

    private User.Gender gender; // Opsiyonel
    private LocalDate birthDate; // Opsiyonel
}
