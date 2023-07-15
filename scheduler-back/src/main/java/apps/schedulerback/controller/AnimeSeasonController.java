package apps.schedulerback.controller;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.record.AnimeSeasonResponse;
import apps.schedulerback.model.record.AnimeSeasonSaveDTO;
import apps.schedulerback.model.record.AnimeSeasonUpdateDTO;
import apps.schedulerback.service.AnimeSeasonService;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("animeseason")
public class AnimeSeasonController {

    final AnimeSeasonService animeSeasonService;

    public AnimeSeasonController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @GetMapping("/{idAnime}/{year}/{season}")
    public ResponseEntity<AnimeSeasonResponse> getByIdAndSeason(@PathVariable long idAnime, @PathVariable String season, @PathVariable long year){
        AnimeSeason animeSeason = animeSeasonService.getAnimeSeasonByIdAnimeAndSeason(idAnime, year, season);
        if(animeSeason == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(new AnimeSeasonResponse(animeSeason));
    }

    @PostMapping ("/")
    public ResponseEntity<AnimeSeasonResponse> saveByIdAndSeason(@RequestBody AnimeSeasonSaveDTO saveRequest){
        AnimeSeason animeSeason = animeSeasonService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest);
        if(animeSeason == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(new AnimeSeasonResponse(animeSeason));
    }

    @PutMapping ("/{uuid}")
    public ResponseEntity<Boolean> updateAnimeSeason(@PathVariable String uuid, @RequestBody AnimeSeasonUpdateDTO saveRequest){
        animeSeasonService.updateAnimeAndSeason(UUID.fromString(uuid), saveRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping ("/{uuid}")
    public ResponseEntity<Boolean> deleteAnimeSeason(@PathVariable @NotEmpty String uuid){
        animeSeasonService.deleteById(UUID.fromString(uuid));
        return ResponseEntity.ok().build();
    }

}
