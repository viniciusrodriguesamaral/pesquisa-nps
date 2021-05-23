package com.iel.nps;

import com.iel.nps.config.NpsProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(NpsProperty.class)
public class NpsApplication {

    public static void main(String[] args) {
        SpringApplication.run(NpsApplication.class, args);
    }

}
