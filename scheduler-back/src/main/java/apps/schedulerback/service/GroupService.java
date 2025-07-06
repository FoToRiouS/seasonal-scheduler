package apps.schedulerback.service;

import apps.schedulerback.model.Group;
import apps.schedulerback.model.User;
import apps.schedulerback.model.domain.ValidationException;
import apps.schedulerback.model.dto.GroupDTO;
import apps.schedulerback.model.mappers.GroupMapper;
import apps.schedulerback.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GroupService extends GenericService<Group, UUID, GroupRepository> {

    final GroupMapper groupMapper;

    public GroupService(GroupRepository repository, GroupMapper groupMapper) {
        super(repository);
        this.groupMapper = groupMapper;
    }

    public Group save(UUID userId, GroupDTO groupDto) {
        Group group = groupMapper.toEntity(groupDto);

        User user = new User();
        user.setId(userId);
        group.setUser(user);

        validate(group);
        validateUniqueGroupId(group);

        return repository.save(group);
    }

    public Group update(UUID groupId, GroupDTO groupDto) {
        Group group = findById(groupId);

        group.setName(groupDto.name());
        group.setGroupId(groupDto.groupId());

        validate(group);
        validateUniqueGroupId(group);

        return repository.save(group);
    }

    private void validateUniqueGroupId(Group group) {
        if(repository.existsByGroupIdAndUserIdAndIdNot(group.getGroupId(), group.getUser().getId(), group.getId())) {
            throw new ValidationException("Grupo já cadastrado para o usuário");
        }
    }

    public List<Group> findGroupsByUserId(UUID userId) { return repository.findByUserId(userId); }
}
