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

    @Column(name = "name_id" , nullable = false)
    private String nameId;

    @Column(name = "image_src" , nullable = false)
    private String imageSrc;

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

    public String getNameId() {
        return nameId;
    }

    public void setNameId(String nameId) {
        this.nameId = nameId;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    @Override
    public int compareTo(WatchService o) {
        return this.getName().compareToIgnoreCase(o.getName());
    }
}
