package apps.schedulerback.repository;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.enums.Seasons;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimeSeasonRepository extends JpaRepository<apps.schedulerback.model.AnimeSeason, UUID> {

    @Override
    @EntityGraph(attributePaths = {"watchServices"})
    Optional<AnimeSeason> findById(UUID uuid);

    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    Optional<AnimeSeason> findByIdAnimeAndSeasons_YearAndSeasons_SeasonName(long idAnime, long seasonYear, Seasons seasonSeasonName);

    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    List<AnimeSeason> findBySeasons_YearAndSeasons_SeasonName(long seasonYear, Seasons seasonSeasonName);

}
