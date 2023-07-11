package apps.schedulerback.model.record;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.Season;

import java.util.UUID;

public record AnimeSeasonResponse(UUID id, long idAnime, Season season, String previewText, String reviewText) {

    public AnimeSeasonResponse(AnimeSeason animeSeason) {
        this(animeSeason.getId(), animeSeason.getIdAnime(), animeSeason.getSeason(), animeSeason.getPreviewText(), animeSeason.getReviewText());
    }

}
