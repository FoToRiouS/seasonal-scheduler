package apps.schedulerback.controller;

import apps.schedulerback.model.dto.SeasonDTO;
import apps.schedulerback.model.mappers.SeasonMapper;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/seasons")
public class SeasonController {

    final AnimeSeasonService animeSeasonService;

    final SeasonMapper mapper;

    public SeasonController(AnimeSeasonService animeSeasonService, SeasonMapper mapper) {
        this.animeSeasonService = animeSeasonService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<SeasonDTO>> listAll(){
        return ResponseEntity.ok(mapper.toDto(animeSeasonService.listAllSeasons()));
    }

}
