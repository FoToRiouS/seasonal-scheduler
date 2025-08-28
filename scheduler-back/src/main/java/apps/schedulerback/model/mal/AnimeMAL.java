package apps.schedulerback.model.mal;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record AnimeMAL(
        int id,
        String title,
        @JsonProperty("alternative_titles") AlternativeTitles alternativeTitles,
        double mean,
        @JsonProperty("main_picture") MainPicture mainPicture,
        @JsonProperty("broadcast") Broadcast broadcast,
        @JsonProperty("alternative_titles") StartSeason startSeason,
        @JsonProperty("media_type") String mediaType,
        List<Genre> genres
) {}
