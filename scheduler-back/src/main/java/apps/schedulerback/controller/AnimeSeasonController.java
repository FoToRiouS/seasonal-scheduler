package apps.schedulerback.controller;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.record.AnimeSeasonDTO;
import apps.schedulerback.model.record.AnimeSeasonSaveDTO;
import apps.schedulerback.model.record.AnimeSeasonUpdateDTO;
import apps.schedulerback.service.AnimeSeasonService;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("animeseason")
public class AnimeSeasonController {

    final AnimeSeasonService animeSeasonService;

    public AnimeSeasonController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @GetMapping("/{idAnime}")
    public ResponseEntity<AnimeSeasonDTO> getByIdAndSeason(@PathVariable long idAnime){
        AnimeSeason animeSeason = animeSeasonService.getAnimeSeasonByIdAnimeAndSeason(idAnime);
        if(animeSeason == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(new AnimeSeasonDTO(animeSeason));
    }

    @GetMapping("/{year}/{season}")
    public ResponseEntity<List<AnimeSeasonDTO>> getByIdAndSeason(@PathVariable String season, @PathVariable long year){
        List<AnimeSeason> list = animeSeasonService.getAnimeSeasonBySeason(year, season);
        for (AnimeSeason animeSeason : list) {
            new AnimeSeasonDTO(animeSeason);
        }
        return ResponseEntity.ok(list.stream().map(a -> new AnimeSeasonDTO(a)).toList());
    }

    @PostMapping ("/")
    public ResponseEntity<AnimeSeasonDTO> saveByIdAndSeason(@RequestBody AnimeSeasonSaveDTO saveRequest){
        AnimeSeason animeSeason = animeSeasonService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest);
        if(animeSeason == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(new AnimeSeasonDTO(animeSeason));
    }

    @PutMapping ("/{uuid}")
    public ResponseEntity<AnimeSeasonDTO> updateAnimeSeason(@PathVariable String uuid, @RequestBody AnimeSeasonUpdateDTO saveRequest){
        AnimeSeason animeSeason = animeSeasonService.updateAnimeAndSeason(UUID.fromString(uuid), saveRequest);
        return ResponseEntity.ok(new AnimeSeasonDTO(animeSeason));
    }

    @DeleteMapping ("/{uuid}/{year}/{season}")
    public ResponseEntity<AnimeSeasonDTO> deleteAnimeSeason(@PathVariable @NotEmpty String uuid, @PathVariable String season, @PathVariable long year){
        AnimeSeason animeSeason = animeSeasonService.deleteAnimeSeasonFromSeason(UUID.fromString(uuid), year, season);
        return ResponseEntity.ok(new AnimeSeasonDTO(animeSeason));
    }

}
