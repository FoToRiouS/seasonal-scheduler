package apps.schedulerback.controller;

import apps.schedulerback.model.User;
import apps.schedulerback.model.dto.*;
import apps.schedulerback.model.mappers.UserMapper;
import apps.schedulerback.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/user")
public class UserController {

    final UserService userService;

    final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<UserDTO> register(@RequestBody UserRegisterDTO userDto) {
        User user = userService.registerUser(userDto);
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @GetMapping("all")
    public ResponseEntity<List<UserDTO>> getAll() {
        return ResponseEntity.ok(userMapper.toDto(userService.listAllUsers()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody AuthenticationRequestDTO request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponseDTO> refreshToken(@RequestBody String refreshToken) {
        AuthenticationResponseDTO response = userService.refreshToken(refreshToken);
        if(response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(userMapper.toDto(userService.findById(id)));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<UserDTO> updateProfile(@PathVariable UUID id, @RequestBody UpdateProfileDTO profileDto) {
        return ResponseEntity.ok(userMapper.toDto(userService.updateProfile(id, profileDto)));
    }

    @PatchMapping("/password/{id}")
    public ResponseEntity<Boolean> updatePassword(@PathVariable UUID id, @RequestBody UpdatePasswordDTO passwordDTO) {
        userService.updatePassword(id, passwordDTO);
        return ResponseEntity.ok(true);
    }
}
