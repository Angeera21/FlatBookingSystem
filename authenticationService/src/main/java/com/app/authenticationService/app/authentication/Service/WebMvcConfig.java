package com.app.authenticationService.app.authentication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    TokenInterceptor token;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
       // registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*");//accept all the port no.
        registry
                // Enable cross-origin request handling for the specified path pattern.
                // Exact path mapping URIs (such as "/admin") are supported as well as Ant-style path patterns (such as "/admin/**").
                .addMapping("/**")
                .allowedOrigins("*")
                // .allowedOriginPatterns("")
                .allowCredentials(false)
                .allowedHeaders("*")
                .exposedHeaders("*")
                .maxAge(60 *30)
                .allowedMethods("*");
        ;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(token);
    }
}
