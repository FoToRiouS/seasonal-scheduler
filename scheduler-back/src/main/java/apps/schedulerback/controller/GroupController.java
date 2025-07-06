package apps.schedulerback.controller;

import apps.schedulerback.model.dto.GroupDTO;
import apps.schedulerback.model.mappers.GroupMapper;
import apps.schedulerback.service.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/groups")
public class GroupController {

    final GroupService groupService;

    final GroupMapper groupMapper;

    public GroupController(GroupService groupService, GroupMapper groupMapper) {
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<GroupDTO>> getGroups(@PathVariable UUID userId) {
        return ResponseEntity.ok(groupMapper.toDto(groupService.findGroupsByUserId(userId)));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<GroupDTO> create(@RequestBody GroupDTO groupDTO, @PathVariable UUID userId) {
        return ResponseEntity.ok(groupMapper.toDto(groupService.save(userId, groupDTO)));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDTO> update(@RequestBody GroupDTO groupDTO, @PathVariable UUID groupId) {
        return ResponseEntity.ok(groupMapper.toDto(groupService.update(groupId, groupDTO)));
    }

}
