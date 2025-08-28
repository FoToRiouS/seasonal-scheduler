package apps.schedulerback.model.mal;

import java.io.Serializable;

public record Genre(
        int id,
        String name
) implements Serializable {}
