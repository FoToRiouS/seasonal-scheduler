package apps.schedulerback.controller;

import apps.schedulerback.model.Season;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("seasons")
public class SeasonController {

    final AnimeSeasonService animeSeasonService;

    public SeasonController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<Season>> listAll(){
        return ResponseEntity.ok(animeSeasonService.listAllSeasons());
    }

}
