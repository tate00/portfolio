package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer{

	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/home").setViewName("hello");
		registry.addViewController("/hello").setViewName("hello");
		registry.addViewController("/login").setViewName("hello");
		registry.addViewController("/typing").setViewName("typing");
		registry.addViewController("/chat").setViewName("chat");
	}
}
