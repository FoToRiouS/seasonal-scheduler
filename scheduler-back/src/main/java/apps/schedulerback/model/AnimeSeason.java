package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "anime_season")
public class AnimeSeason {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "id_anime")
    private long idAnime;

    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @Column(name = "preview_text")
    private String previewText;

    @Column(name = "review_text")
    private String reviewText;

    @ManyToMany
    @JoinTable(
            name = "anime_service",
            joinColumns = @JoinColumn(name = "anime_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private Set<WatchService> watchServices;

    public AnimeSeason() {}

    public AnimeSeason(long idAnime, Season season) {
        this.idAnime = idAnime;
        this.season = season;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public long getIdAnime() {
        return idAnime;
    }

    public void setIdAnime(long idAnime) {
        this.idAnime = idAnime;
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

    public Set<WatchService> getWatchServices() {
        return watchServices;
    }

    public void setWatchServices(Set<WatchService> watchServices) {
        this.watchServices = watchServices;
    }
}
