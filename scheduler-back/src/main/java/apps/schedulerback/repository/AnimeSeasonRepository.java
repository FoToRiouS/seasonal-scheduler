package apps.schedulerback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnimeSeasonRepository extends JpaRepository<apps.schedulerback.model.AnimeSeason, UUID> {
}
