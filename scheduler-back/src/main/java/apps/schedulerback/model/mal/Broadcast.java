package apps.schedulerback.model.mal;

import java.io.Serializable;

public record Broadcast(
        String day_of_the_week,
        String start_time
) implements Serializable {}
