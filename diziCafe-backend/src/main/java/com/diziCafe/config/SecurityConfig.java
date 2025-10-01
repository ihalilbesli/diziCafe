package com.diziCafe.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // auth & docs herkese açık
                        .requestMatchers("/diziCafe/auth/**",
                                "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // FILMS: GET istekleri herkese açık
                        .requestMatchers(HttpMethod.GET, "/diziCafe/films/**").permitAll()

                        // RATINGS: ortalama puan herkese açık
                        .requestMatchers(HttpMethod.GET, "/diziCafe/ratings/*/average").permitAll()

                        // COMMENTS: GET herkese açık, ekleme/güncelleme/silme → login gerekli
                        .requestMatchers(HttpMethod.GET, "/diziCafe/comments/**").permitAll()
                        .requestMatchers("/diziCafe/comments/**").authenticated()

                        // COMMENT-LIKES: sayılar herkese açık
                        .requestMatchers(HttpMethod.GET, "/diziCafe/comment-likes/likeCount/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/diziCafe/comment-likes/dislikeCount/**").permitAll()

                        // COMMENT-LIKES: kullanıcıya özel olanlar → login gerekli
                        .requestMatchers("/diziCafe/comment-likes/hasLiked/**").authenticated()
                        .requestMatchers("/diziCafe/comment-likes/hasDisliked/**").authenticated()

                        // COMMENT-LIKES: like/dislike ekleme & silme → login gerekli
                        .requestMatchers(HttpMethod.POST, "/diziCafe/comment-likes/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/diziCafe/comment-likes/**").authenticated()

                        // RATINGS: kendi puanı görme, ekleme, güncelleme, silme → login gerekli
                        .requestMatchers("/diziCafe/ratings/**").authenticated()

                        // FILMS: yazma işlemleri sadece ADMIN
                        .requestMatchers("/diziCafe/films/add",
                                "/diziCafe/films/update/**",
                                "/diziCafe/films/delete/**").hasAuthority("ADMIN")

                        // diğer her şey auth ister
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
