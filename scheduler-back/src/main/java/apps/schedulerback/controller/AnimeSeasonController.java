package apps.schedulerback.controller;

import apps.schedulerback.model.Anime;
import apps.schedulerback.model.dto.AnimeDTO;
import apps.schedulerback.model.dto.AnimeSaveDTO;
import apps.schedulerback.model.dto.AnimeUpdateDTO;
import apps.schedulerback.model.mappers.AnimeMapper;
import apps.schedulerback.service.AnimeService;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/animeseason")
public class AnimeSeasonController {

    final AnimeService animeService;

    final AnimeMapper mapper;

    public AnimeSeasonController(AnimeService animeService, AnimeMapper mapper) {
        this.animeService = animeService;
        this.mapper = mapper;
    }

    @GetMapping("/{idAnime}")
    public ResponseEntity<AnimeDTO> getByIdAndSeason(@PathVariable long idAnime){
        Anime anime = animeService.getAnimeSeasonByIdAnimeAndSeason(idAnime);
        if(anime == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @GetMapping("/{userId}/{year}/{season}")
    public ResponseEntity<List<AnimeDTO>> getByIdAndSeason(@PathVariable String season, @PathVariable long year, @PathVariable UUID userId){
        Instant inicio = Instant.now();
        List<Anime> list = animeService.getAnimeSeasonBySeason(userId, year, season);
        Instant fim = Instant.now();

        Duration duracao = Duration.between(inicio, fim);
        System.out.println("O método AnimeSeasonController.getByIdAndSeason executou em " + duracao.toMillis() + " milissegundos.");
        return ResponseEntity.ok(mapper.toDto(list));
    }

    @PostMapping ("/")
    public ResponseEntity<AnimeDTO> saveByIdAndSeason(@RequestBody AnimeSaveDTO saveRequest){
        Anime anime = animeService.saveAnimeSeasonByIdAnimeAndSeason(saveRequest);
        if(anime == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @PutMapping ("/{uuid}")
    public ResponseEntity<AnimeDTO> updateAnimeSeason(@PathVariable String uuid, @RequestBody AnimeUpdateDTO saveRequest){
        Anime anime = animeService.updateAnimeAndSeason(UUID.fromString(uuid), saveRequest);
        return ResponseEntity.ok(mapper.toDto(anime));
    }

    @DeleteMapping ("/{uuid}/{year}/{season}")
    public ResponseEntity<AnimeDTO> deleteAnimeSeason(@PathVariable @NotEmpty String uuid, @PathVariable String season, @PathVariable long year){
        Anime anime = animeService.deleteAnimeSeasonFromSeason(UUID.fromString(uuid), year, season);
        if(anime == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(mapper.toDto(anime));
    }

}
