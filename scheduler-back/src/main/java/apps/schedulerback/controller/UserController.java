package apps.schedulerback.controller;

import apps.schedulerback.model.User;
import apps.schedulerback.model.dto.AuthenticateResponseDTO;
import apps.schedulerback.model.dto.UserDTO;
import apps.schedulerback.model.dto.UserRegisterDTO;
import apps.schedulerback.model.mappers.UserMapper;
import apps.schedulerback.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<AuthenticateResponseDTO> login(@RequestBody User user) {
        return null;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticateResponseDTO> refreshToken(@RequestBody User user) {
        return null;
    }
}
