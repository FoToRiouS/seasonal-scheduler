package apps.schedulerback.service;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.Season;
import apps.schedulerback.model.WatchService;
import apps.schedulerback.repository.AnimeSeasonRepository;
import apps.schedulerback.repository.SeasonRepository;
import apps.schedulerback.repository.WatchServiceRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
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

    public Collection<Season> listAllSeasons(){
        return seasonRepository.findAll();
    }

    public Collection<WatchService> listAllWatchServices(){
        return watchServiceRepository.findAll();
    }
}
