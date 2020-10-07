package com.api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.model.Course;

public interface CourseRepository extends MongoRepository<Course, String>{
	// List<Course> findByDate(String eventDate);
}
