package apps.schedulerback.service;

import apps.schedulerback.model.*;
import apps.schedulerback.model.dto.AnimeSaveDTO;
import apps.schedulerback.model.dto.AnimeSeasonDTO;
import apps.schedulerback.model.dto.AnimeUpdateDTO;
import apps.schedulerback.model.enums.Seasons;
import apps.schedulerback.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AnimeService extends GenericService<Anime, UUID, AnimeRepository> {

    private final SeasonRepository seasonRepository;

    private final WatchServiceRepository watchServiceRepository;
    private final UserRepository userRepository;

    public AnimeService(AnimeRepository repository, SeasonRepository seasonRepository, WatchServiceRepository watchServiceRepository, GroupRepository groupRepository, UserRepository userRepository) {
        super(repository);
        this.seasonRepository = seasonRepository;
        this.watchServiceRepository = watchServiceRepository;
        this.userRepository = userRepository;
    }

    public Anime getAnimeSeasonByIdAnimeAndSeason(Long idAnime){
        return repository.findByIdAnime(idAnime).orElse(null);
    }

    public List<Anime> getAnimeSeasonBySeason(UUID userId, Long year, String seasonName){
        return repository.findByUser_IdAndAnimeSeasons_Season_YearAndAnimeSeasons_Season_SeasonName(userId, year, Seasons.valueOf(seasonName));
    }

    @Transactional
    public Anime saveAnimeSeasonByIdAnimeAndSeason(AnimeSaveDTO saveRequest){
        User user = userRepository.findById(UUID.fromString(saveRequest.userId())).orElseThrow();

        Season season = seasonRepository.findBySeasonNameAndYear(Seasons.valueOf(saveRequest.season()), saveRequest.year()).orElse(null);
        if(season == null){
            season = new Season(saveRequest.season(), saveRequest.year());
            season = seasonRepository.save(season);
        }

        Anime anime = repository.findByIdAnime(saveRequest.idAnime()).orElse(null);
        if(anime == null){
            anime = new Anime(saveRequest.idAnime(), user);
        }
        anime.addSeason(season);
        return repository.save(anime);
    }

    @Transactional
    public Anime updateAnimeAndSeason(UUID id, AnimeUpdateDTO saveRequest){
        Anime anime = repository.findById(id).orElseThrow();

        Map<String, AnimeSeasonDTO> seasonDtoMap = saveRequest.animeSeasons().stream()
                .collect(Collectors.toMap(
                        dto -> dto.season().season() + "-" + dto.season().year(),
                        dto -> dto
                ));

        for (AnimeSeason as : anime.getAnimeSeasons()) {
            String key = as.getSeason().getSeasonName().toString() + "-" + as.getSeason().getYear();
            AnimeSeasonDTO animeSeasonDTO = seasonDtoMap.get(key);

            if (animeSeasonDTO != null) {
                as.setPreviewText(animeSeasonDTO.previewText());
                as.setReviewText(animeSeasonDTO.reviewText());
            }
        }

        Collection<UUID> listServices = saveRequest.services().stream().map(UUID::fromString).toList();
        anime.getWatchServices().addAll(watchServiceRepository.findAllById(listServices));
        return repository.save(anime);
    }

    @Transactional
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
