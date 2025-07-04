package apps.schedulerback.model.pk;

import java.util.Objects;
import java.util.UUID;

public class AnimeSeasonID {

    private UUID anime;

    private UUID season;

    public UUID getAnime() {
        return anime;
    }

    public void setAnime(UUID anime) {
        this.anime = anime;
    }

    public UUID getSeason() {
        return season;
    }

    public void setSeason(UUID season) {
        this.season = season;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AnimeSeasonID that = (AnimeSeasonID) o;
        return Objects.equals(anime, that.anime) && Objects.equals(season, that.season);
    }

    @Override
    public int hashCode() {
        return Objects.hash(anime, season);
    }
}
