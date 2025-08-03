package apps.schedulerback.model.dto.telegram;

/**
 * Representa o remetente da mensagem ('from').
 *
 * @param id O ID do usuário.
 * @param isBot True se o usuário for um bot.
 * @param firstName O primeiro nome do usuário.
 * @param lastName O sobrenome do usuário.
 * @param username O nome de usuário.
 * @param languageCode O código de idioma do cliente do usuário.
 */
public record TelegramWebhookUser(
        long id,
        boolean isBot,
        String firstName,
        String lastName,
        String username,
        String languageCode
) {}
