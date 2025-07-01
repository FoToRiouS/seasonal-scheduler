package apps.schedulerback.service;

import apps.schedulerback.model.User;
import apps.schedulerback.model.domain.ValidationException;
import apps.schedulerback.model.dto.UserRegisterDTO;
import apps.schedulerback.model.mappers.UserMapper;
import apps.schedulerback.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService extends GenericService<User, UUID, UserRepository> implements UserDetailsService {

    final UserMapper userMapper;

    final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        super(repository);
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username).orElse(null);
    }

    public User registerUser(UserRegisterDTO userDTO) {
        User entity = userMapper.toEntity(userDTO);
        validate(entity);

        if (repository.findByUsername(entity.getUsername()).isPresent()) {
            throw new ValidationException(List.of("Nome de Usuário já cadastrado"));
        }

        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        return save(entity);
    }

    public List<User> listAllUsers() { return repository.findAll(); }
}
