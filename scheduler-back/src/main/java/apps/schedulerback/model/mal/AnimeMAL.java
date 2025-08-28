package apps.schedulerback.model.mal;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public record AnimeMAL(
        Integer id,
        String title,
        AlternativeTitles alternativeTitles,
        Double mean,
        MainPicture mainPicture,
        Broadcast broadcast,
        StartSeason startSeason,
        String mediaType,
        List<Genre> genres
) implements Serializable {
    @JsonCreator
    public static AnimeMAL create(
            @JsonProperty("id") int id,
            @JsonProperty("title") String title,
            @JsonProperty("alternative_titles") Map<String, Object> alternativeTitles,
            @JsonProperty("mean") Double mean,
            @JsonProperty("main_picture") MainPicture mainPicture,
            @JsonProperty("broadcast") Broadcast broadcast,
            @JsonProperty("start_season") StartSeason startSeason,
            @JsonProperty("media_type") String mediaType,
            @JsonProperty("genres") List<Genre> genres
    ) {
        String japaneseTitle = (alternativeTitles != null && alternativeTitles.containsKey("ja"))
                ? (String) alternativeTitles.get("ja")
                : null;

        String englishTitle = (alternativeTitles != null && alternativeTitles.containsKey("en"))
                ? (String) alternativeTitles.get("en")
                : null;

        AlternativeTitles at = new AlternativeTitles(englishTitle, japaneseTitle);

        return new AnimeMAL(id, title, at, mean, mainPicture, broadcast, startSeason, mediaType, genres);
    }
}
