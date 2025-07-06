package apps.schedulerback.service;

import apps.schedulerback.model.User;
import apps.schedulerback.model.domain.ValidationException;
import apps.schedulerback.model.dto.*;
import apps.schedulerback.model.mappers.GroupMapper;
import apps.schedulerback.model.mappers.UserMapper;
import apps.schedulerback.repository.GroupRepository;
import apps.schedulerback.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    final GroupMapper groupMapper;

    final PasswordEncoder passwordEncoder;

    final AuthenticationManager authenticationManager;

    final JwtService jwtService;

    final GroupRepository groupRepository;

    public UserService(
            UserRepository repository,
            UserMapper userMapper, GroupMapper groupMapper,
            @Lazy PasswordEncoder passwordEncoder,
            @Lazy AuthenticationManager authenticationManager,
            JwtService jwtService, GroupRepository groupRepository) {
        super(repository);
        this.userMapper = userMapper;
        this.groupMapper = groupMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.groupRepository = groupRepository;
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

    public AuthenticationResponseDTO login(AuthenticationRequestDTO loginRequest){
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password());
        Authentication auth = authenticationManager.authenticate(token);
        User user = (User) auth.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user.getId().toString());
        String refreshToken = jwtService.generateRefreshToken(user.getId().toString());
        return new AuthenticationResponseDTO(accessToken, refreshToken, user.getId().toString());
    }

    public AuthenticationResponseDTO refreshToken(String refreshToken) {
        String userId = jwtService.validateToken(refreshToken);
        if(userId == null) {
            return null;
        }

        String newAccessToken = jwtService.generateAccessToken(userId);
        String newRefreshToken = jwtService.generateRefreshToken(userId);
        return new AuthenticationResponseDTO(newAccessToken, newRefreshToken, userId);
    }

    public User updateProfile(UUID userId, UpdateProfileDTO profileDTO) {
        User user = findById(userId);
        if(user == null) {
            throw new RuntimeException("User not found");
        }

        user.setName(profileDTO.name());
        user.setEmail(profileDTO.email());
        user.setPhone(profileDTO.phone());

        return save(user);
    }

    public void updatePassword(UUID userId, UpdatePasswordDTO passwordDTO) {
        User user = findById(userId);
        if(user == null) {
            throw new RuntimeException("User not found");
        }

        if(!passwordEncoder.matches(passwordDTO.oldPassword(), user.getPassword())) {
            throw new ValidationException(List.of("Senha antiga inválida"));
        }

        user.setPassword(passwordEncoder.encode(passwordDTO.newPassword()));
        save(user);
    }

    public List<User> listAllUsers() { return repository.findAll(); }
}
