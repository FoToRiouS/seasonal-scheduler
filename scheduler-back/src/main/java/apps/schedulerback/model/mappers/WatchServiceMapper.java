package apps.schedulerback.model.mappers;

import apps.schedulerback.model.WatchService;
import apps.schedulerback.model.dto.WatchServiceDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class)
public interface WatchServiceMapper extends EntityMapper<WatchService, WatchServiceDTO> {
}
