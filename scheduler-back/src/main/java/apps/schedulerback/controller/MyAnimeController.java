package apps.schedulerback.controller;

import apps.schedulerback.model.mal.AnimeMAL;
import apps.schedulerback.service.MyAnimeListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("api/mal")
public class MyAnimeController {

    final MyAnimeListService myAnimeListService;

    public MyAnimeController(MyAnimeListService myAnimeListService) {
        this.myAnimeListService = myAnimeListService;
    }

    @GetMapping("/season/{year}/{season}")
    public ResponseEntity<List<AnimeMAL>> findBySeason(@PathVariable Long year, @PathVariable String season) {
        Instant inicio = Instant.now();
        List<AnimeMAL> list = myAnimeListService.findBySeason(year, season);
        Instant fim = Instant.now();

        Duration duracao = Duration.between(inicio, fim);
        System.out.println("O método MyAnimeController.findBySeason executou em " + duracao.toMillis() + " milissegundos.");

        return ResponseEntity.ok(list);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<AnimeMAL> findById(@PathVariable Long id) {
        return ResponseEntity.ok(myAnimeListService.findById(id));
    }
}
