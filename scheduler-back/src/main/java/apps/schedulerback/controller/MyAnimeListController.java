package apps.schedulerback.controller;

import apps.schedulerback.model.mal.AnimeMAL;
import apps.schedulerback.service.MyAnimeListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/mal")
public class MyAnimeListController {

    final MyAnimeListService myAnimeListService;

    public MyAnimeListController(MyAnimeListService myAnimeListService) {
        this.myAnimeListService = myAnimeListService;
    }

    @GetMapping("/season/{year}/{season}")
    public ResponseEntity<List<AnimeMAL>> findBySeason(@PathVariable Long year, @PathVariable String season) {
        List<AnimeMAL> list = myAnimeListService.findBySeason(year, season);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<AnimeMAL> findById(@PathVariable Long id) {
        return ResponseEntity.ok(myAnimeListService.findById(id));
    }
}
