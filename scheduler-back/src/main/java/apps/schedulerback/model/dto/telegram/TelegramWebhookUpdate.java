package apps.schedulerback.model.dto.telegram;

/**
 * DTO principal que representa o payload completo do webhook do Telegram.
 *
 * @param updateId O identificador único da atualização.
 * @param message O objeto da mensagem recebida.
 */
public record TelegramWebhookUpdate(
        long updateId,
        TelegramWebhookMessage message
) {}
