package apps.schedulerback.controller;

import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.dto.WatchServiceDTO;
import apps.schedulerback.model.mappers.WatchServiceMapper;
import apps.schedulerback.service.AnimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/watchservices")
public class WatchServiceController {

    final AnimeService animeService;

    final WatchServiceMapper mapper;

    public WatchServiceController(AnimeService animeService, WatchServiceMapper mapper) {
        this.animeService = animeService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<WatchServiceDTO>> listAll(){
        Collection<WatchService> watchServices = animeService.listAllWatchServices();
        return ResponseEntity.ok(mapper.toDto(watchServices));
    }

}
