package apps.schedulerback.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TelegramService {

    final WebClient webClientTelegram;

    public TelegramService(@Qualifier("webClientTelegram") WebClient webClientTelegram) {
        this.webClientTelegram = webClientTelegram;
    }

    public void sendMessage(String chatId, String message) {
        webClientTelegram.get()
                .uri(uriBuilder ->  uriBuilder
                        .path("/sendMessage")
                        .queryParam("chat_id", chatId)
                        .queryParam("text", message)
                        .queryParam("disable_notification", true)
                        .build())
                .retrieve()
                .toBodilessEntity()
                .subscribe();
    }
}
