package apps.schedulerback.model.mal;

import apps.schedulerback.model.enums.Seasons;

public record StartSeason(
        int year,
        Seasons season
) {}