package apps.schedulerback.model.record;

import apps.schedulerback.model.Season;

public record SeasonDTO(Long year, String season) {
    public SeasonDTO(Season season) {
        this(
                season.getYear(),
                season.getSeasonName().getId()
        );
    }
}
