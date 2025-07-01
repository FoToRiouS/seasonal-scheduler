package apps.schedulerback.model.dto;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;

public record AnimeSeasonDTO(UUID id, Long idAnime, Collection<SeasonDTO> seasons, String previewText, String reviewText, Set<UUID> services) {
}
