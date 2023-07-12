package apps.schedulerback.model;

import apps.schedulerback.model.enums.Seasons;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "season", uniqueConstraints = @UniqueConstraint(name = "", columnNames = {"season_name", "year"}))
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "season_name")
    @Enumerated(EnumType.STRING)
    private Seasons seasonName;

    @Column(name = "year")
    private long year;

    public Season(Seasons seasonName, long year) {
        this.seasonName = seasonName;
        this.year = year;
    }

    public Season(String name, long year) {
        this.seasonName = Seasons.valueOf(name);
        this.year = year;
    }    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Seasons getSeasonName() {
        return seasonName;
    }

    public void setSeasonName(Seasons seasonName) {
        this.seasonName = seasonName;
    }

    public long getYear() {
        return year;
    }

    public void setYear(long year) {
        this.year = year;
    }
}
