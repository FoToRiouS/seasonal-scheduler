package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "watch_service")
public class WatchService {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    private String name;

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
}
