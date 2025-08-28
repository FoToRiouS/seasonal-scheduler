package apps.schedulerback.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    final ApplicationConfig appConfig;

    public WebClientConfig(ApplicationConfig appConfig) {
        this.appConfig = appConfig;
    }

    @Bean
    @Qualifier("webClientTelegram")
    public WebClient webClientTelegram() {
        String baseUrl = appConfig.getTelegram().getBaseApiUrl() + appConfig.getTelegram().getBotToken();
        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    @Bean
    @Qualifier("webClientMAL")
    public WebClient webClientMAL() {
        String baseUrl = appConfig.getMyAnimeList().getBaseUrl();
        return WebClient.builder()
                .baseUrl(baseUrl)
                .defaultRequest(r -> r.header("Accept", "application/json"))
                .defaultRequest(r -> r.header("Content-Type", "application/json"))
                .defaultRequest(r -> r.header("X-MAL-CLIENT-ID", appConfig.getMyAnimeList().getToken()))
                .build();
    }

}
