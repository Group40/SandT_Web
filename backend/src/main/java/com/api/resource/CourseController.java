package com.api.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.model.Course;
import com.api.repository.CourseRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseController {

	@Autowired
	private CourseRepository repository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addCourse")
	public String saveCourse(@RequestBody Course course) {
		repository.save(course);
		return "Added a new course";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/updateCourse")
	public String saveUpdatedCourse(@RequestBody Course course) {
		repository.save(course);
		return "Update the course";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAllCourses")
	public List<Course> getCourses(){
		return repository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAllCourses/{id}")
	public Optional<Course> getCourse(@PathVariable String id){
		return repository.findById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteCourse/{id}")
	public String deleteCourse(@PathVariable String id) {
		repository.deleteById(id);
		return "course deleted with id : "+id;
	}
}
