package apps.schedulerback.controller;

import apps.schedulerback.model.dto.SeasonDTO;
import apps.schedulerback.model.mappers.SeasonMapper;
import apps.schedulerback.service.AnimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/seasons")
public class SeasonController {

    final AnimeService animeService;

    final SeasonMapper mapper;

    public SeasonController(AnimeService animeService, SeasonMapper mapper) {
        this.animeService = animeService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/list", produces = "application/json")
    public ResponseEntity<Collection<SeasonDTO>> listAll(){
        return ResponseEntity.ok(mapper.toDto(animeService.listAllSeasons()));
    }

}
