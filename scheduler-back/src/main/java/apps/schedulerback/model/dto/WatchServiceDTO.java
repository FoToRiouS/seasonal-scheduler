package apps.schedulerback.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record WatchServiceDTO(@NotNull UUID id, @NotBlank String name, @NotBlank String nameId, @NotBlank String imageSrc) {
}
