package apps.schedulerback.service;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.Group;
import apps.schedulerback.model.Season;
import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.enums.Seasons;
import apps.schedulerback.model.record.AnimeSeasonSaveDTO;
import apps.schedulerback.model.record.AnimeSeasonUpdateDTO;
import apps.schedulerback.repository.AnimeSeasonRepository;
import apps.schedulerback.repository.GroupRepository;
import apps.schedulerback.repository.SeasonRepository;
import apps.schedulerback.repository.WatchServiceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.TreeSet;
import java.util.UUID;

@Service
public class AnimeSeasonService extends GenericService<AnimeSeason, UUID, AnimeSeasonRepository> {

    private final SeasonRepository seasonRepository;

    private final WatchServiceRepository watchServiceRepository;

    private final GroupRepository groupRepository;

    public AnimeSeasonService(AnimeSeasonRepository repository, SeasonRepository seasonRepository, WatchServiceRepository watchServiceRepository, GroupRepository groupRepository) {
        super(repository);
        this.seasonRepository = seasonRepository;
        this.watchServiceRepository = watchServiceRepository;
        this.groupRepository = groupRepository;
    }

    public AnimeSeason getAnimeSeasonByIdAnimeAndSeason(Long idAnime){
        return repository.findByIdAnime(idAnime).orElse(null);
    }

    public List<AnimeSeason> getAnimeSeasonBySeason(Long year, String seasonName){
        return repository.findBySeasons_YearAndSeasons_SeasonName(year, Seasons.valueOf(seasonName));
    }

    public AnimeSeason saveAnimeSeasonByIdAnimeAndSeason(AnimeSeasonSaveDTO saveRequest){
        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(saveRequest.season()), saveRequest.year()).orElse(null);
        if(season == null){
            season = new Season(saveRequest.season(), saveRequest.year());
            season = seasonRepository.save(season);
        }

        AnimeSeason animeSeason = repository.findByIdAnime(saveRequest.idAnime()).orElse(null);
        if(animeSeason == null){
            animeSeason = new AnimeSeason(saveRequest.idAnime());
        }
        animeSeason.getSeasons().add(season);
        return repository.save(animeSeason);
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

    public AnimeSeason deleteAnimeSeasonFromSeason(UUID id, Long year, String seasonName) {
        AnimeSeason animeSeason = repository.findById(id).orElseThrow();
        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(seasonName), year).orElseThrow();
        animeSeason.getSeasons().remove(season);
        if(animeSeason.getSeasons().isEmpty()){
            repository.delete(animeSeason);
            return null;
        } else {
            repository.save(animeSeason);
        }
        return animeSeason;
    }

    public Collection<Season> listAllSeasons(){
        return seasonRepository.findAll();
    }

    public Collection<WatchService> listAllWatchServices(){
        return watchServiceRepository.findAll();
    }

    public Collection<Group> listAllGroups(){
        return groupRepository.findAll();
    }
}
