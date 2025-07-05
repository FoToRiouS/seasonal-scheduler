package apps.schedulerback.controller;

import apps.schedulerback.model.dto.GroupDTO;
import apps.schedulerback.model.mappers.GroupMapper;
import apps.schedulerback.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/groups")
public class GroupController {

    final UserService userService;

    final GroupMapper groupMapper;

    public GroupController(UserService userService, GroupMapper groupMapper) {
        this.userService = userService;
        this.groupMapper = groupMapper;
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<GroupDTO>> getGroups(@PathVariable UUID userId) {
        return ResponseEntity.ok(groupMapper.toDto(userService.findByUserId(userId)));
    }

}
