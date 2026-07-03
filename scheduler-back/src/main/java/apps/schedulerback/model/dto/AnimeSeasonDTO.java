package apps.schedulerback.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnimeSeasonDTO(@NotBlank String animeId, @NotNull SeasonDTO season, String previewText, String reviewText) {
}
