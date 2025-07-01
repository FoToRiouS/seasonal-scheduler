package apps.schedulerback.model.dto;

import java.util.Set;

public record AnimeSeasonUpdateDTO(String previewText, String reviewText, Set<String> services) {

}
