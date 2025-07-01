package apps.schedulerback.model.mappers;

import apps.schedulerback.model.User;
import apps.schedulerback.model.dto.UserDTO;
import apps.schedulerback.model.dto.UserRegisterDTO;
import org.mapstruct.Mapper;

@Mapper(config = BaseMapperConfig.class)
public interface UserMapper extends EntityMapper<User, UserDTO> {

    User toEntity(UserRegisterDTO userRegister);

}
