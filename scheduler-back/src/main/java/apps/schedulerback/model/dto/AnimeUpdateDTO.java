package apps.schedulerback.model.dto;

import java.util.List;
import java.util.Set;

public record AnimeUpdateDTO(List<AnimeSeasonDTO> animeSeasons, Set<String> services) {

}
