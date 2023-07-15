package apps.schedulerback.model.record;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.Season;
import apps.schedulerback.model.WatchService;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record AnimeSeasonResponse(UUID id, long idAnime, Season season, String previewText, String reviewText, Set<UUID> services) {

    public AnimeSeasonResponse(AnimeSeason animeSeason) {
        this(animeSeason.getId(),
                animeSeason.getIdAnime(),
                animeSeason.getSeason(),
                animeSeason.getPreviewText(),
                animeSeason.getReviewText(),
                animeSeason.getWatchServices().stream().map(WatchService::getId).collect(Collectors.toSet()));
    }

}
