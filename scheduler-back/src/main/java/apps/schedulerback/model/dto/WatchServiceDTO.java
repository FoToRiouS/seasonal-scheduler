package apps.schedulerback.model.dto;

import java.util.UUID;

public record WatchServiceDTO(UUID id, String name, String nameId, String imageSrc) {
}
