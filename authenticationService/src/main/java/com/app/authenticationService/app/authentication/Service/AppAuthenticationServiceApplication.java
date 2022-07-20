package com.app.authenticationService.app.authentication.Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AppAuthenticationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppAuthenticationServiceApplication.class, args);
	}

//	@KafkaListener(topics = "mytopic", groupId = "group-id")
//	public void listen(String message) {
//		System.out.println("Received Messasge in group - group-id: " + message);
//	}
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedOrigins("*")
                .allowedHeaders("*");
			}
		};
	}
}

