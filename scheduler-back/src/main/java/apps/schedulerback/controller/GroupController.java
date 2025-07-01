package apps.schedulerback.controller;

import apps.schedulerback.model.Group;
import apps.schedulerback.service.AnimeSeasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/groups")
public class GroupController {

    final AnimeSeasonService animeSeasonService;

    public GroupController(AnimeSeasonService animeSeasonService) {
        this.animeSeasonService = animeSeasonService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Long>> getAllGroups() {
        return ResponseEntity.ok(animeSeasonService.listAllGroups().stream().map(Group::getGroupId).toList());
    }

}
