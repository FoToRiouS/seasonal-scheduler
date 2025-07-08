package apps.schedulerback.model.dto;

import java.util.Set;
import java.util.UUID;

public record AnimeDTO(UUID id, Long idAnime, Set<AnimeSeasonDTO> animeSeasons, Set<WatchServiceDTO> watchServices) {
}
