package apps.schedulerback.model.dto;

import apps.schedulerback.model.mal.AnimeMAL;

import java.util.Set;
import java.util.UUID;

public record AnimeDTO(UUID id, AnimeMAL animeMAL, Set<AnimeSeasonDTO> animeSeasons, Set<WatchServiceDTO> watchServices) {
}
