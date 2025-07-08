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
    @EntityGraph("animeWithSeasons")
    Optional<Anime> findById(UUID uuid);

    @EntityGraph("animeWithSeasons")
    Optional<Anime> findByIdAnimeAndAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(long idAnime, long seasonYear, Seasons seasonSeasonName);

    @EntityGraph("animeWithSeasons")
    List<Anime> findByUser_IdAndAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(UUID user_id, long seasonYear, Seasons season);

    @EntityGraph("animeWithSeasons")
    Optional<Anime> findByIdAnime(long idAnime);
}
