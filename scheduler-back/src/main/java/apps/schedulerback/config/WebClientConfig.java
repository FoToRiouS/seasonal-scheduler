package apps.schedulerback.config;

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
    public WebClient webClientTelegram() {
        String baseUrl = appConfig.getTelegram().getBaseApiUrl() + appConfig.getTelegram().getBotToken();
        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

}
