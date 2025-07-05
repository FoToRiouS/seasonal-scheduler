package apps.schedulerback.model;

import apps.schedulerback.model.pk.AnimeSeasonID;
import jakarta.persistence.*;

@Entity
@Table(name = "anime_season_season")
public class AnimeSeason {

    @EmbeddedId
    private AnimeSeasonID id;

    @MapsId("anime")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "anime_season_id", nullable = false)
    private Anime anime;

    @MapsId("season")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "season_id", nullable = false)
    private Season season;

    @Column(name = "preview_text", length = 900)
    private String previewText;

    @Column(name = "review_text", length = 900)
    private String reviewText;

    public AnimeSeason() {
        this.id = new AnimeSeasonID();
    }

    public AnimeSeason(Anime anime, Season season) {
        this();
        this.anime = anime;
        this.season = season;
    }

    public AnimeSeasonID getId() {
        return id;
    }

    public void setId(AnimeSeasonID id) {
        this.id = id;
    }

    public Anime getAnime() {
        return anime;
    }

    public void setAnime(Anime anime) {
        this.anime = anime;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public String getPreviewText() {
        return previewText;
    }

    public void setPreviewText(String previewText) {
        this.previewText = previewText;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
