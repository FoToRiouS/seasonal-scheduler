package apps.schedulerback.service;

import apps.schedulerback.config.ApplicationConfig;
import apps.schedulerback.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class JwtSecurityService {

    final UserRepository userRepository;

    final ApplicationConfig appConfig;

    final Algorithm algorithm;

    public JwtSecurityService(UserRepository userRepository, ApplicationConfig appConfig) {
        this.userRepository = userRepository;
        this.appConfig = appConfig;
        this.algorithm = Algorithm.HMAC256(appConfig.getSecurity().getJwtSecret());
    }

    public String generateAccessToken(String userId) {
        try {
            return JWT.create().withIssuer(appConfig.getSecurity().getJwtIssuer()).withSubject(userId).withExpiresAt(getAccessExpirationTime()).sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String generateRefreshToken(String userId) {
        try {
            return JWT.create().withIssuer(appConfig.getSecurity().getJwtIssuer()).withSubject(userId).withExpiresAt(getRefreshExpirationTime()).sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String validateToken(String token) {
        try {
            return JWT.require(algorithm).withIssuer(appConfig.getSecurity().getJwtIssuer()).build().verify(token).getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    public String getSubject(String token) {
        return JWT.decode(token).getSubject();
    }

    private Instant getAccessExpirationTime() {
//                return LocalDateTime.now().plusYears(10).toInstant(ZoneOffset.of("-03:00"));
        return LocalDateTime.now().plusMinutes(15).toInstant(ZoneOffset.of("-03:00"));
    }

    private Instant getRefreshExpirationTime() {
        //        return LocalDateTime.now().plusSeconds(5).toInstant(ZoneOffset.of("-03:00"));
        return LocalDateTime.now().plusDays(3).toInstant(ZoneOffset.of("-03:00"));
    }

}
