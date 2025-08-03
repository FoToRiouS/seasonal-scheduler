package apps.schedulerback.repository;

import apps.schedulerback.model.GroupToken;
import apps.schedulerback.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GroupTokenRepository extends JpaRepository<GroupToken, User> {

    @EntityGraph("GroupToken.user")
    Optional<GroupToken> findByUser_Id(UUID userId);

    @EntityGraph("GroupToken.user")
    Optional<GroupToken> findByToken(UUID token);

}
