package apps.schedulerback.model.mal;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AnimeNode(
        @JsonProperty("node") AnimeMAL node
) {
}
