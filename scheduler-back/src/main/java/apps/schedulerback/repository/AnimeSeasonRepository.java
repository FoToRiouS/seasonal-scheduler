package apps.schedulerback.repository;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.enums.Seasons;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AnimeSeasonRepository extends JpaRepository<apps.schedulerback.model.AnimeSeason, UUID> {

    Optional<AnimeSeason> findByIdAnimeAndSeason_YearAndSeason_SeasonName(long idAnime, long seasonYear, Seasons seasonSeasonName);

}
