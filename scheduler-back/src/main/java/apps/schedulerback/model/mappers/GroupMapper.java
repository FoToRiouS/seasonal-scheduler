package apps.schedulerback.model.mappers;

import apps.schedulerback.model.Group;
import apps.schedulerback.model.dto.GroupDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class)
public interface GroupMapper extends EntityMapper<Group, GroupDTO> {
}
