package apps.schedulerback.model.record;

import apps.schedulerback.model.WatchService;

import java.util.UUID;

public record WatchServiceResponse(UUID id, String name) {

    public WatchServiceResponse(WatchService watchService) {
        this(watchService.getId(), watchService.getName());
    }

}
