package apps.schedulerback.model.domain;

import java.util.List;

public class ValidationException extends RuntimeException{

    private final List<String> errors;

    public List<String> getErrors() {
        return errors;
    }

    public ValidationException(List<String> errors) {
        this.errors = errors;
    }

    public ValidationException(String error) {
        this.errors = List.of(error);
    }

}
