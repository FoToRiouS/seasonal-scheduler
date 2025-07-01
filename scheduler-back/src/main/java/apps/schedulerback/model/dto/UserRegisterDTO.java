package apps.schedulerback.model.dto;

public record UserRegisterDTO(
        String username,
        String name,
        String email,
        String phone,
        String password,
        String confirmPassword
) {
}