package apps.schedulerback.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "group_token")
@NamedEntityGraph(name = "GroupToken.user", attributeNodes = @NamedAttributeNode("user"))
public class GroupToken {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    @Column(name = "token", nullable = false)
    private UUID token;

    public UUID getToken() {
        return token;
    }

    public void setToken(UUID token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
