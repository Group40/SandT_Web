package com.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins="http://localhost:3000")
public class SandtgroupApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SandtgroupApplication.class, args);
		//main function - run this as a java application 
	}
}
