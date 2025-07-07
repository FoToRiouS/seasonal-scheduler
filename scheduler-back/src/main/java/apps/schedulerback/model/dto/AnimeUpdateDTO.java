package apps.schedulerback.model.dto;

import java.util.Set;

public record AnimeUpdateDTO(String previewText, String reviewText, Set<String> services) {

}
