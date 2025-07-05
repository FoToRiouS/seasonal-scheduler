package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "anime_season")
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "id_anime", unique = true)
    private long idAnime;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "anime", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private Set<AnimeSeason> animeSeasons;

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

    public Anime() {}

    public Anime(long idAnime) {
        this.idAnime = idAnime;
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

    public Set<AnimeSeason> getAnimeSeasons() {
        if(animeSeasons == null){
            animeSeasons = new HashSet<>();
        }
        return animeSeasons;
    }

    public void setAnimeSeasons(Set<AnimeSeason> animeSeasons) {
        this.animeSeasons = animeSeasons;
    }

    public void addSeason(Season season) {
        AnimeSeason animeSeason = new AnimeSeason(this, season);
        getAnimeSeasons().add(animeSeason);
    }

    public void removeSeason(Season season) {
        getAnimeSeasons().removeIf(animeSeason -> animeSeason.getSeason().equals(season));
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
