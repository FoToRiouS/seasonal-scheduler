package apps.schedulerback.model.domain;

import org.springframework.http.HttpStatus;

public record GeneralExceptionResponse(HttpStatus statusCode, String exceptionName, String message) {}
