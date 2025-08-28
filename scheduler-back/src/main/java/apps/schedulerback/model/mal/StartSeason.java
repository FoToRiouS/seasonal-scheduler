package apps.schedulerback.model.mal;

import apps.schedulerback.model.enums.Seasons;

import java.io.Serializable;

public record StartSeason(
        int year,
        Seasons season
) implements Serializable {}