package apps.schedulerback.model.mal;

import java.io.Serializable;

public record AlternativeTitles (
        String en,
        String ja
) implements Serializable {

}