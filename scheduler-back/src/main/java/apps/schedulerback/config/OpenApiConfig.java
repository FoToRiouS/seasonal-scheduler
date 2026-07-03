package apps.schedulerback.config;

import io.swagger.v3.oas.models.Operation;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

@Configuration
public class OpenApiConfig {

    @Bean
    public OperationCustomizer customGlobalOperationId() {
        return (Operation operation, HandlerMethod handlerMethod) -> {
            io.swagger.v3.oas.annotations.Operation annotation = handlerMethod.getMethodAnnotation(
                io.swagger.v3.oas.annotations.Operation.class
            );
            if (annotation != null && !annotation.operationId().isEmpty()) {
                return operation;
            }

            String controllerName = handlerMethod.getBeanType().getSimpleName().replace("Controller", "");
            String methodName = handlerMethod.getMethod().getName();

            String camelCaseOperationId = controllerName.toLowerCase() + methodName.substring(0, 1).toUpperCase() + methodName.substring(1);

            operation.setOperationId(camelCaseOperationId);

            return operation;
        };
    }
}
