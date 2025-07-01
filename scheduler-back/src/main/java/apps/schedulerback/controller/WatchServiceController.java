package apps.schedulerback.controller;

import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.dto.WatchServiceDTO;
import apps.schedulerback.model.mappers.WatchServiceMapper;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/watchservices")
public class WatchServiceController {

    final AnimeSeasonService animeSeasonService;

    final WatchServiceMapper mapper;

    public WatchServiceController(AnimeSeasonService animeSeasonService, WatchServiceMapper mapper) {
        this.animeSeasonService = animeSeasonService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<WatchServiceDTO>> listAll(){
        Collection<WatchService> watchServices = animeSeasonService.listAllWatchServices();
        return ResponseEntity.ok(mapper.toDto(watchServices));
    }

}
