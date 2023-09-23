package apps.schedulerback.controller;

import apps.schedulerback.model.record.WatchServiceResponse;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("watchservices")
public class WatchServiceController {

    final AnimeSeasonService animeSeasonService;

    public WatchServiceController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<WatchServiceResponse>> listAll(){
        return ResponseEntity.ok(animeSeasonService.listAllWatchServices().stream().map(WatchServiceResponse::new).toList());
    }

}
