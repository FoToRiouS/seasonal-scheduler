package apps.schedulerback.repository;

import apps.schedulerback.model.Anime;
import apps.schedulerback.model.enums.Seasons;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnimeRepository extends JpaRepository<Anime, UUID> {

    @Override
    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    Optional<Anime> findById(UUID uuid);

    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    Optional<Anime> findByIdAnimeAndAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(long idAnime, long seasonYear, Seasons seasonSeasonName);

    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    List<Anime> findByAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(long seasonYear, Seasons seasonSeasonName);

    @EntityGraph(attributePaths = {"seasons", "watchServices"})
    Optional<Anime> findByIdAnime(long idAnime);
}
