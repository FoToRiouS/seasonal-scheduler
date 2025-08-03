package apps.schedulerback.controller;

import apps.schedulerback.model.dto.telegram.TelegramWebhookUpdate;
import apps.schedulerback.service.GroupService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/telegram")
public class TelegramController {

    final GroupService groupService;

    public TelegramController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/update")
    public void receiveUpdate(@RequestBody TelegramWebhookUpdate update) {
        groupService.registerGroup(update);
    }

}
