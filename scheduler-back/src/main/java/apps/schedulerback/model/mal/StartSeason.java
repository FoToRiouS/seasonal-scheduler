package apps.schedulerback.model.mal;

import apps.schedulerback.model.enums.Seasons;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record StartSeason(
        @NotNull int year,
        @NotNull Seasons season
) implements Serializable {}