package apps.schedulerback.model.mappers;

import apps.schedulerback.model.AnimeSeason;
import apps.schedulerback.model.dto.AnimeSeasonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = BaseMapperConfig.class, uses = {SeasonMapper.class})
public interface AnimeSeasonMapper extends EntityMapper<AnimeSeason, AnimeSeasonDTO> {

    @Override
    @Mapping(target = "animeId", source = "anime.id")
    AnimeSeasonDTO toDto(AnimeSeason animeSeason);
}
