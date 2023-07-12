package apps.schedulerback.repository;

import apps.schedulerback.model.Season;
import apps.schedulerback.model.enums.Seasons;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SeasonRepository extends JpaRepository<Season, UUID> {

    Optional<Season> findBySeasonNameAndYear(Seasons seasonName, long year);

}
