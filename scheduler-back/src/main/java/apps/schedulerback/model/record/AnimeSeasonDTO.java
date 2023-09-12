package apps.schedulerback.model.record;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.WatchService;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record AnimeSeasonDTO(UUID id, Long idAnime, Collection<SeasonDTO> seasons, String previewText, String reviewText, Set<UUID> services) {

    public AnimeSeasonDTO(AnimeSeason animeSeason) {
        this(animeSeason.getId(),
                animeSeason.getIdAnime(),
                animeSeason.getSeasons().stream().map(SeasonDTO::new).toList(),
                animeSeason.getPreviewText(),
                animeSeason.getReviewText(),
                animeSeason.getWatchServices().stream().map(WatchService::getId).collect(Collectors.toSet()));
    }

}
