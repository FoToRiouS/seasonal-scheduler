package apps.schedulerback.model.record;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.WatchService;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record AnimeSeasonDTO(UUID id, long idAnime, SeasonDTO season, String previewText, String reviewText, Set<UUID> services) {

    public AnimeSeasonDTO(AnimeSeason animeSeason) {
        this(animeSeason.getId(),
                animeSeason.getIdAnime(),
                new SeasonDTO(animeSeason.getSeason()),
                animeSeason.getPreviewText(),
                animeSeason.getReviewText(),
                animeSeason.getWatchServices().stream().map(WatchService::getId).collect(Collectors.toSet()));
    }

}
