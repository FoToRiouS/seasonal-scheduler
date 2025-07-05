package apps.schedulerback.repository;

import apps.schedulerback.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {

    List<Group> findByUserId(UUID userId);

}
