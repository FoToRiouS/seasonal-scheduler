package apps.schedulerback.model.mappers;

import apps.schedulerback.model.Anime;
import apps.schedulerback.model.dto.AnimeDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class, uses = {AnimeSeasonMapper.class})
public interface AnimeMapper extends EntityMapper<Anime, AnimeDTO> {
}
