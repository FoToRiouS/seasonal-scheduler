package apps.schedulerback.model.mappers;

import apps.schedulerback.model.Season;
import apps.schedulerback.model.dto.SeasonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(config = BaseMapperConfig.class)
public interface SeasonMapper extends EntityMapper<Season, SeasonDTO> {

    @Override
    @Mapping(target = "season", source = "seasonName")
    SeasonDTO toDto(Season season);

    @Override
    @Mapping(target = "seasonName", source = "season")
    List<Season> toEntity(Iterable<SeasonDTO> seasonDTOS);
}
