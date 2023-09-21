package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "watch_service")
public class WatchService implements Comparable<WatchService> {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "color" , nullable = false)
    private String color;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String icon) {
        this.color = icon;
    }

    @Override
    public int compareTo(WatchService o) {
        return this.getName().compareToIgnoreCase(o.getName());
    }
}
