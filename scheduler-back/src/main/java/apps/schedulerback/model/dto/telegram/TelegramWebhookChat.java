package apps.schedulerback.model.dto.telegram;

/**
 * Representa o chat ('chat').
 *
 * @param id O ID do chat.
 * @param title O título do chat.
 * @param type O tipo de chat ("group", "private", etc.).
 * @param allMembersAreAdministrators True se todos os membros forem administradores.
 */
public record TelegramWebhookChat(
        String id,
        String title,
        String type,
        boolean allMembersAreAdministrators
) {}
