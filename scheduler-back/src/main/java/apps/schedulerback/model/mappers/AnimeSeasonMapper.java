package apps.schedulerback.model.mappers;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.dto.AnimeSeasonDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class, uses = {SeasonMapper.class})
public interface AnimeSeasonMapper extends EntityMapper<AnimeSeason, AnimeSeasonDTO> {
}
