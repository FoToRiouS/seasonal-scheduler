package apps.schedulerback.model.mal;

import java.io.Serializable;

public record MainPicture(
        String medium,
        String large
) implements Serializable {}
