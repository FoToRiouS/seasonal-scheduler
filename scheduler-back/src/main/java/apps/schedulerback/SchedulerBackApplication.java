package apps.schedulerback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SchedulerBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchedulerBackApplication.class, args);
    }

}
