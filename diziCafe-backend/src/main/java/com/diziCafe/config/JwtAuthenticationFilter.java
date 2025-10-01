package com.diziCafe.config;

import com.diziCafe.model.User;
import com.diziCafe.repository.UserRepository;
import com.diziCafe.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.validateToken(token)) {
                Long userId = jwtUtil.extractUserId(token);

                User user = userRepository.findById(userId).orElse(null);

                if (user != null) {
                    // ✅ Banlı kullanıcı giriş yapamasın
                    if (user.isBanned()) {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.getWriter().write("Hesabınız banlandığı için giriş yapamazsınız.");
                        return;
                    }

                    // ✅ Kullanıcının rolünü authority olarak ekle
                    var authorities = List.of(new SimpleGrantedAuthority(user.getRole().name()));
                    // Eğer SecurityConfig'te hasRole("ADMIN") kullanmak istersen:
                    // var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

                    // ✅ Principal olarak sadece userId gönderiyoruz
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user.getId(), // sadece ID
                                    null,
                                    authorities
                            );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
