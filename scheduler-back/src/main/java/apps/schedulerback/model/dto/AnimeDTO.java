package apps.schedulerback.model.dto;

import apps.schedulerback.model.AnimeSeason;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;

public record AnimeDTO(UUID id, Long idAnime, Set<AnimeSeasonDTO> animeSeasons, Set<UUID> services) {
}
