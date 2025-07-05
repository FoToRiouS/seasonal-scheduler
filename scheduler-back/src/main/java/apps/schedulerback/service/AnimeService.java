package apps.schedulerback.service;

import apps.schedulerback.model.Anime;
import apps.schedulerback.model.Season;
import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.dto.AnimeSeasonSaveDTO;
import apps.schedulerback.model.dto.AnimeSeasonUpdateDTO;
import apps.schedulerback.model.enums.Seasons;
import apps.schedulerback.repository.AnimeRepository;
import apps.schedulerback.repository.GroupRepository;
import apps.schedulerback.repository.SeasonRepository;
import apps.schedulerback.repository.WatchServiceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.TreeSet;
import java.util.UUID;

@Service
public class AnimeService extends GenericService<Anime, UUID, AnimeRepository> {

    private final SeasonRepository seasonRepository;

    private final WatchServiceRepository watchServiceRepository;

    public AnimeService(AnimeRepository repository, SeasonRepository seasonRepository, WatchServiceRepository watchServiceRepository, GroupRepository groupRepository) {
        super(repository);
        this.seasonRepository = seasonRepository;
        this.watchServiceRepository = watchServiceRepository;
    }

    public Anime getAnimeSeasonByIdAnimeAndSeason(Long idAnime){
        return repository.findByIdAnime(idAnime).orElse(null);
    }

    public List<Anime> getAnimeSeasonBySeason(Long year, String seasonName){
        return repository.findByAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(year, Seasons.valueOf(seasonName));
    }

    public Anime saveAnimeSeasonByIdAnimeAndSeason(AnimeSeasonSaveDTO saveRequest){
        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(saveRequest.season()), saveRequest.year()).orElse(null);
        if(season == null){
            season = new Season(saveRequest.season(), saveRequest.year());
            season = seasonRepository.save(season);
        }

        Anime anime = repository.findByIdAnime(saveRequest.idAnime()).orElse(null);
        if(anime == null){
            anime = new Anime(saveRequest.idAnime());
        }
        anime.addSeason(season);
        return repository.save(anime);
    }

    public Anime updateAnimeAndSeason(UUID id, AnimeSeasonUpdateDTO saveRequest){
        Anime anime = repository.findById(id).orElseThrow();
        anime.setPreviewText(saveRequest.previewText());
        anime.setReviewText(saveRequest.reviewText());

        Collection<UUID> listServices = saveRequest.services().stream().map(UUID::fromString).toList();
        anime.setWatchServices(new TreeSet<>(watchServiceRepository.findAllById(listServices)));
        anime. getWatchServices().addAll(watchServiceRepository.findAllById(listServices));
        return repository.save(anime);
    }

    public Anime deleteAnimeSeasonFromSeason(UUID id, Long year, String seasonName) {
        Anime anime = repository.findById(id).orElseThrow();
        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(seasonName), year).orElseThrow();
        anime.removeSeason(season);
        if(anime.getAnimeSeasons() == null ||anime.getAnimeSeasons().isEmpty()){
            repository.delete(anime);
            return null;
        } else {
            repository.save(anime);
        }
        return anime;
    }

    public Collection<Season> listAllSeasons(){
        return seasonRepository.findAll();
    }

    public Collection<WatchService> listAllWatchServices(){
        return watchServiceRepository.findAll();
    }
}
