package apps.schedulerback.config;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@ConfigurationProperties(prefix = "app")
@Validated
public class ApplicationConfig {

    @Valid
    private Security security;

    @Valid
    private Telegram telegram;

    @Valid
    private MyAnimeList myAnimeList;

    public Security getSecurity() {
        return security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public Telegram getTelegram() {
        return telegram;
    }

    public void setTelegram(Telegram telegram) {
        this.telegram = telegram;
    }

    public MyAnimeList getMyAnimeList() {
        return myAnimeList;
    }

    public void setMyAnimeList(MyAnimeList myAnimeList) {
        this.myAnimeList = myAnimeList;
    }

    public static class Security {

        @NotEmpty
        private String jwtSecret;

        @NotEmpty
        private String jwtIssuer;

        public String getJwtSecret() {
            return jwtSecret;
        }

        public void setJwtSecret(String jwtSecret) {
            this.jwtSecret = jwtSecret;
        }

        public String getJwtIssuer() {
            return jwtIssuer;
        }

        public void setJwtIssuer(String jwtIssuer) {
            this.jwtIssuer = jwtIssuer;
        }
    }

    public static class Telegram {

        @NotEmpty
        private String botToken;

        @NotEmpty
        private String baseApiUrl;

        public String getBotToken() {
            return botToken;
        }

        public void setBotToken(String botToken) {
            this.botToken = botToken;
        }

        public String getBaseApiUrl() {
            return baseApiUrl;
        }

        public void setBaseApiUrl(String baseApiUrl) {
            this.baseApiUrl = baseApiUrl;
        }
    }

    public static class MyAnimeList {

        @NotEmpty
        private String baseUrl;

        @NotEmpty
        private String token;

        public String getBaseUrl() {
            return baseUrl;
        }

        public void setBaseUrl(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}


