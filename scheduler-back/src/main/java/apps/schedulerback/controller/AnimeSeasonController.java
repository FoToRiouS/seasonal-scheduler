package apps.schedulerback.controller;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.record.AnimeSeasonResponse;
import apps.schedulerback.model.record.AnimeSeasonSaveRequest;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("animeseason")
public class AnimeSeasonController {

    final AnimeSeasonService animeSeasonService;

    public AnimeSeasonController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{idAnime}/{year}/{season}")
    public ResponseEntity<AnimeSeasonResponse> getByIdAndSeason(@PathVariable long idAnime, @PathVariable String season, @PathVariable long year){
        AnimeSeason animeSeason = animeSeasonService.getAnimeSeasonByIdAnimeAndSeason(idAnime, year, season);
        if(animeSeason == null) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(new AnimeSeasonResponse(animeSeason));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping ("/")
    public ResponseEntity<AnimeSeasonResponse> saveByIdAndSeason(@RequestBody AnimeSeasonSaveRequest saveRequest){
        AnimeSeason animeSeason = animeSeasonService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest.idAnime(), saveRequest.year(), saveRequest.season());
        if(animeSeason == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(new AnimeSeasonResponse(animeSeason));
    }

}
