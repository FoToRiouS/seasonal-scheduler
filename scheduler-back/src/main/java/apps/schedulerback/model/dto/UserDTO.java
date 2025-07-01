package apps.schedulerback.model.dto;

import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        String name,
        String email,
        String phone
) {
}