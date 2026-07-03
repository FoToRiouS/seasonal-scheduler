package apps.schedulerback.model.mal;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record MainPicture(
        @NotBlank String medium,
        @NotBlank String large
) implements Serializable {}
