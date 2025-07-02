package apps.schedulerback.model.dto;

public record AuthenticationResponseDTO(String accessToken, String refreshToken, String userId) {
}
