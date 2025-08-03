package apps.schedulerback.model.dto.telegram;

/**
 * Representa o objeto 'message'.
 *
 * @param messageId O ID da mensagem.
 * @param from O remetente da mensagem.
 * @param chat O chat onde a mensagem foi enviada.
 * @param date A data em que a mensagem foi enviada (timestamp Unix).
 * @param text O texto da mensagem.
 */
public record TelegramWebhookMessage(
        long messageId,
        TelegramWebhookUser from,
        TelegramWebhookChat chat,
        long date,
        String text
) {}
