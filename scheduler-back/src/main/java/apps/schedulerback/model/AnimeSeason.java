package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "anime_season")
public class AnimeSeason {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "id_anime")
    private long idAnime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "anime_season_season",
            joinColumns = @JoinColumn(name = "anime_season_id"),
            inverseJoinColumns = @JoinColumn(name = "season_id"))
    private Set<Season> seasons;

    @Column(name = "preview_text", length = 900)
    private String previewText;

    @Column(name = "review_text", length = 900)
    private String reviewText;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "anime_service",
            joinColumns = @JoinColumn(name = "anime_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private SortedSet<WatchService> watchServices;

    public AnimeSeason() {}

    public AnimeSeason(long idAnime, Season season) {
        this.idAnime = idAnime;
        getSeasons().add(season);
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

    public Set<Season> getSeasons() {
        if(seasons == null){
            seasons = new HashSet<>();
        }
        return seasons;
    }

    public void setSeasons(Set<Season> seasons) {
        this.seasons = seasons;
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

    public SortedSet<WatchService> getWatchServices() {
        if(watchServices == null){
            watchServices = new TreeSet<>();
        }
        return watchServices;
    }

    public void setWatchServices(SortedSet<WatchService> watchServices) {
        this.watchServices = watchServices;
    }
}
