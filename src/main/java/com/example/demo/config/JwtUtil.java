package com.example.demo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final Key SECRET_KEY =
        Keys.hmacShaKeyFor(
                "mySuperSecretJwtKeyForPropVaultApplication2026SecurityKey123456789"
                        .getBytes(StandardCharsets.UTF_8)
        );

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24; // 24 hours

    public static String generateToken(
            Long userId,
            String email,
            String role
    ) {

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION
                        )
                )
                .signWith(
                        SECRET_KEY,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public static Claims extractClaims(
            String token
    ) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static boolean validateToken(
            String token
    ) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}