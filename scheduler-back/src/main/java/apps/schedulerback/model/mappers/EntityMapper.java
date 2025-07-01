package apps.schedulerback.model.mappers;

import java.util.List;

public interface EntityMapper<ENTITY, DTO extends Record> {
    DTO toDto(ENTITY entity);

    List<DTO> toDto(Iterable<ENTITY> entities);

    ENTITY toEntity(DTO dto);

    List<ENTITY> toEntity(Iterable<DTO> dtos);
}
