package com.diziCafe.service;

import com.diziCafe.dto.AuthRequest;
import com.diziCafe.dto.AuthResponse;
import com.diziCafe.dto.RegisterRequest;

public interface AuthService {

    AuthResponse login(AuthRequest request);

    AuthResponse register(RegisterRequest request);
}
