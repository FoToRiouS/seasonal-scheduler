package apps.schedulerback.config;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@ConfigurationProperties(prefix = "app")
@Validated
public class ApplicationConfig {

    @Valid
    private Security security;

    public Security getSecurity() {
        return security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public static class Security {

        @NotEmpty
        private String jwtSecret;

        @NotEmpty
        private String jwtIssuer;

        public String getJwtSecret() {
            return jwtSecret;
        }

        public void setJwtSecret(String jwtSecret) {
            this.jwtSecret = jwtSecret;
        }

        public String getJwtIssuer() {
            return jwtIssuer;
        }

        public void setJwtIssuer(String jwtIssuer) {
            this.jwtIssuer = jwtIssuer;
        }
    }
}


