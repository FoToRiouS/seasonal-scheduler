package apps.schedulerback.model.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationResponseDTO(@NotBlank String accessToken, @NotBlank String refreshToken,  @NotBlank String userId) {
}
