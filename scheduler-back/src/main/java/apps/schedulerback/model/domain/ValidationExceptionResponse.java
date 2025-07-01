package apps.schedulerback.model.domain;

import java.util.List;

public record ValidationExceptionResponse(String exceptionName, List<String> messages) {}
