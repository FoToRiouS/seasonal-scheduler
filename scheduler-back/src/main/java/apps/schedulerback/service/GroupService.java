package apps.schedulerback.service;

import apps.schedulerback.model.Group;
import apps.schedulerback.model.GroupToken;
import apps.schedulerback.model.User;
import apps.schedulerback.model.domain.ValidationException;
import apps.schedulerback.model.dto.GroupDTO;
import apps.schedulerback.model.dto.telegram.TelegramWebhookUpdate;
import apps.schedulerback.model.mappers.GroupMapper;
import apps.schedulerback.repository.GroupRepository;
import apps.schedulerback.repository.GroupTokenRepository;
import apps.schedulerback.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GroupService extends GenericService<Group, UUID, GroupRepository> {

    final GroupMapper groupMapper;

    final GroupTokenRepository groupTokenRepository;

    final UserRepository userRepository;

    final TelegramService telegramService;

    public GroupService(GroupRepository repository, GroupMapper groupMapper, GroupTokenRepository groupTokenRepository, UserRepository userRepository, TelegramService telegramService) {
        super(repository);
        this.groupMapper = groupMapper;
        this.groupTokenRepository = groupTokenRepository;
        this.userRepository = userRepository;
        this.telegramService = telegramService;
    }

    public Group save(UUID userId, GroupDTO groupDto) {
        Group group = groupMapper.toEntity(groupDto);

        User user = new User();
        user.setId(userId);
        group.setUser(user);

        validate(group);
        validateUniqueGroupId(group);

        return repository.save(group);
    }

    public Group update(UUID groupId, GroupDTO groupDto) {
        Group group = findById(groupId);

        group.setName(groupDto.name());

        validate(group);
        validateUniqueGroupId(group);

        return repository.save(group);
    }

    private void validateUniqueGroupId(Group group) {
        if(repository.existsByGroupIdAndUserIdAndIdNot(group.getGroupId(), group.getUser().getId(), group.getId())) {
            throw new ValidationException("Grupo já cadastrado para o usuário");
        }
    }

    @Transactional
    public UUID generateRegisterGroupToken(UUID userId) {
        GroupToken groupToken = groupTokenRepository.findByUser_Id(userId).orElse(null);
        if(groupToken != null) {
            return groupToken.getToken();
        } else {
            User user = userRepository.findById(userId).orElseThrow();

            groupToken = new GroupToken();
            groupToken.setToken(UUID.randomUUID());
            groupToken.setUser(user);
            return groupTokenRepository.save(groupToken).getToken();
        }
    }

    @Transactional
    public void registerGroup(TelegramWebhookUpdate payload) {
        if(payload.message() != null && payload.message().chat().type().equals("group")) {
            try{
                String message = payload.message().text();
                if(message != null && message.startsWith("/start")) {
                    String token = message.split(" ")[1];
                    GroupToken groupToken = groupTokenRepository.findByToken(UUID.fromString(token)).orElse(null);
                    if(groupToken != null) {
                        Group group = new Group();
                        group.setUser(groupToken.getUser());
                        group.setGroupId(payload.message().chat().id());
                        group.setName(payload.message().chat().title());

                        if(!repository.existsByGroupIdAndUserId(group.getGroupId(), group.getUser().getId())) {
                            repository.save(group);
                            groupTokenRepository.delete(groupToken);

                            telegramService.sendMessage(payload.message().chat().id(), "Grupo registrado com sucesso!");
                        } else {
                            telegramService.sendMessage(payload.message().chat().id(), "Grupo já registrado!");
                        }
                    } else {
                        throw new IllegalArgumentException();
                    }
                }
            } catch (ArrayIndexOutOfBoundsException | IllegalArgumentException e) {
                telegramService.sendMessage(payload.message().chat().id(), "Falha ao registrar o grupo! Token inválido.");
            }

        }
    }

    public List<Group> findGroupsByUserId(UUID userId) { return repository.findByUserId(userId); }
}
