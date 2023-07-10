package apps.schedulerback.repository;

import apps.schedulerback.model.WatchService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WatchServiceRepository extends JpaRepository<WatchService, UUID> {
}
