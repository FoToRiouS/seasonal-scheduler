package apps.schedulerback.service;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.Season;
import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.enums.Seasons;
import apps.schedulerback.model.record.AnimeSeasonSaveDTO;
import apps.schedulerback.model.record.AnimeSeasonUpdateDTO;
import apps.schedulerback.repository.AnimeSeasonRepository;
import apps.schedulerback.repository.SeasonRepository;
import apps.schedulerback.repository.WatchServiceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.TreeSet;
import java.util.UUID;

@Service
public class AnimeSeasonService extends GenericService<AnimeSeason, UUID, AnimeSeasonRepository> {

    private final SeasonRepository seasonRepository;

    private final WatchServiceRepository watchServiceRepository;

    public AnimeSeasonService(AnimeSeasonRepository repository, SeasonRepository seasonRepository, WatchServiceRepository watchServiceRepository) {
        super(repository);
        this.seasonRepository = seasonRepository;
        this.watchServiceRepository = watchServiceRepository;
    }

    public AnimeSeason getAnimeSeasonByIdAnimeAndSeason(Long idAnime, Long year, String seasonName){
        return repository.findByIdAnimeAndSeason_YearAndSeason_SeasonName(idAnime, year, Seasons.valueOf(seasonName)).orElse(null);
    }

    public AnimeSeason saveAnimeSeasonByIdAnimeAndSeason(AnimeSeasonSaveDTO saveRequest){
        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(saveRequest.season()), saveRequest.year()).orElse(null);
        if(season == null){
            season = new Season(saveRequest.season(), saveRequest.year());
            season = seasonRepository.save(season);
        }
        return repository.save(new AnimeSeason(saveRequest.idAnime(), season));
    }

    public AnimeSeason updateAnimeAndSeason(UUID id, AnimeSeasonUpdateDTO saveRequest){
        AnimeSeason animeSeason = repository.findById(id).orElseThrow();
        animeSeason.setPreviewText(saveRequest.previewText());
        animeSeason.setReviewText(saveRequest.reviewText());

        Collection<UUID> listServices = saveRequest.services().stream().map(UUID::fromString).toList();
        animeSeason.setWatchServices(new TreeSet<>(watchServiceRepository.findAllById(listServices)));
        animeSeason. getWatchServices().addAll(watchServiceRepository.findAllById(listServices));
        return repository.save(animeSeason);
    }

    public Collection<Season> listAllSeasons(){
        return seasonRepository.findAll();
    }

    public Collection<WatchService> listAllWatchServices(){
        return watchServiceRepository.findAll();
    }
}
