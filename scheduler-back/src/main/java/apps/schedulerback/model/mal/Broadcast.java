package apps.schedulerback.model.mal;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record Broadcast(
        @NotBlank String day_of_the_week,
        @NotBlank String start_time
) implements Serializable {}
