package apps.schedulerback.controller;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.dto.AnimeSeasonDTO;
import apps.schedulerback.model.dto.AnimeSeasonSaveDTO;
import apps.schedulerback.model.dto.AnimeSeasonUpdateDTO;
import apps.schedulerback.model.mappers.AnimeSeasonMapper;
import apps.schedulerback.service.AnimeSeasonService;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/animeseason")
public class AnimeSeasonController {

    final AnimeSeasonService animeSeasonService;

    final AnimeSeasonMapper mapper;

    public AnimeSeasonController(AnimeSeasonService animeSeasonService, AnimeSeasonMapper mapper) {
        this.animeSeasonService = animeSeasonService;
        this.mapper = mapper;
    }

    @GetMapping("/{idAnime}")
    public ResponseEntity<AnimeSeasonDTO> getByIdAndSeason(@PathVariable long idAnime){
        AnimeSeason animeSeason = animeSeasonService.getAnimeSeasonByIdAnimeAndSeason(idAnime);
        if(animeSeason == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(mapper.toDto(animeSeason));
    }

    @GetMapping("/{year}/{season}")
    public ResponseEntity<List<AnimeSeasonDTO>> getByIdAndSeason(@PathVariable String season, @PathVariable long year){
        List<AnimeSeason> list = animeSeasonService.getAnimeSeasonBySeason(year, season);
        return ResponseEntity.ok(mapper.toDto(list));
    }

    @PostMapping ("/")
    public ResponseEntity<AnimeSeasonDTO> saveByIdAndSeason(@RequestBody AnimeSeasonSaveDTO saveRequest){
        AnimeSeason animeSeason = animeSeasonService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest);
        if(animeSeason == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(mapper.toDto(animeSeason));
    }

    @PutMapping ("/{uuid}")
    public ResponseEntity<AnimeSeasonDTO> updateAnimeSeason(@PathVariable String uuid, @RequestBody AnimeSeasonUpdateDTO saveRequest){
        AnimeSeason animeSeason = animeSeasonService.updateAnimeAndSeason(UUID.fromString(uuid), saveRequest);
        return ResponseEntity.ok(mapper.toDto(animeSeason));
    }

    @DeleteMapping ("/{uuid}/{year}/{season}")
    public ResponseEntity<AnimeSeasonDTO> deleteAnimeSeason(@PathVariable @NotEmpty String uuid, @PathVariable String season, @PathVariable long year){
        AnimeSeason animeSeason = animeSeasonService.deleteAnimeSeasonFromSeason(UUID.fromString(uuid), year, season);
        return ResponseEntity.ok(mapper.toDto(animeSeason));
    }

}
