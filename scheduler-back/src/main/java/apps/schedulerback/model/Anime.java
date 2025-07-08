package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "anime_season", uniqueConstraints = @UniqueConstraint(name = "", columnNames = {"id_anime", "user_id"}))
@NamedEntityGraph(name = "animeWithSeasons",
        attributeNodes = {
                @NamedAttributeNode(value = "animeSeasons", subgraph = "seasons"),
                @NamedAttributeNode(value = "watchServices")
        }, subgraphs = {
        @NamedSubgraph(name = "seasons", attributeNodes = {
            @NamedAttributeNode(value = "season")
        })
})
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "id_anime", unique = true)
    private long idAnime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "anime", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private Set<AnimeSeason> animeSeasons;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "anime_service",
            joinColumns = @JoinColumn(name = "anime_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private SortedSet<WatchService> watchServices;

    public Anime() {}

    public Anime(long idAnime, User user) {
        this.idAnime = idAnime;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
