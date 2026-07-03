package apps.schedulerback.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SeasonDTO(@NotNull Long year, @NotBlank String season) {
}
