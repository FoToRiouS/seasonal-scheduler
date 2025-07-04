package apps.schedulerback.controller;

import apps.schedulerback.model.Anime;
import apps.schedulerback.model.dto.AnimeSeasonDTO;
import apps.schedulerback.model.dto.AnimeSeasonSaveDTO;
import apps.schedulerback.model.dto.AnimeSeasonUpdateDTO;
import apps.schedulerback.model.mappers.AnimeSeasonMapper;
import apps.schedulerback.service.AnimeService;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/animeseason")
public class AnimeSeasonController {

    final AnimeService animeService;

    final AnimeSeasonMapper mapper;

    public AnimeSeasonController(AnimeService animeService, AnimeSeasonMapper mapper) {
        this.animeService = animeService;
        this.mapper = mapper;
    }

    @GetMapping("/{idAnime}")
    public ResponseEntity<AnimeSeasonDTO> getByIdAndSeason(@PathVariable long idAnime){
        Anime anime = animeService.getAnimeSeasonByIdAnimeAndSeason(idAnime);
        if(anime == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @GetMapping("/{year}/{season}")
    public ResponseEntity<List<AnimeSeasonDTO>> getByIdAndSeason(@PathVariable String season, @PathVariable long year){
        List<Anime> list = animeService.getAnimeSeasonBySeason(year, season);
        return ResponseEntity.ok(mapper.toDto(list));
    }

    @PostMapping ("/")
    public ResponseEntity<AnimeSeasonDTO> saveByIdAndSeason(@RequestBody AnimeSeasonSaveDTO saveRequest){
        Anime anime = animeService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest);
        if(anime == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @PutMapping ("/{uuid}")
    public ResponseEntity<AnimeSeasonDTO> updateAnimeSeason(@PathVariable String uuid, @RequestBody AnimeSeasonUpdateDTO saveRequest){
        Anime anime = animeService.updateAnimeAndSeason(UUID.fromString(uuid), saveRequest);
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @DeleteMapping ("/{uuid}/{year}/{season}")
    public ResponseEntity<AnimeSeasonDTO> deleteAnimeSeason(@PathVariable @NotEmpty String uuid, @PathVariable String season, @PathVariable long year){
        Anime anime = animeService.deleteAnimeSeasonFromSeason(UUID.fromString(uuid), year, season);
        return ResponseEntity.ok(mapper.toDto(anime));
    }

}
