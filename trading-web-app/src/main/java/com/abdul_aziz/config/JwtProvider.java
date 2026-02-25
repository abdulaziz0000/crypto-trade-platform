package com.abdul_aziz.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;

public class JwtProvider {

    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.secret_key.getBytes());

    public static String generateToken(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);
        String jwt = Jwts.builder().setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+950404044))
                .claim("email", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        return jwt;
    }

    public static String getEmailFromJwtToken(String token) {
        token = token.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }

    private static String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auth = new HashSet<>();

        for (GrantedAuthority g : authorities) {
            auth.add(g.getAuthority());
        }
        return String.join(",", auth);
    }
}
