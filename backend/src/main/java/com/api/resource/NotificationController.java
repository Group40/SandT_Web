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

import com.api.model.Notification;
import com.api.repository.NotificationRepository;
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class NotificationController {

	@Autowired
	private NotificationRepository repository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addNotification")
	public String saveNotification(@RequestBody Notification notification) {
		repository.save(notification);
		return "Added a new notification";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAllNotifications")
	public List<Notification> getNotifications(){
		return repository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteNotification/{id}")
	public String deleteNotification(@PathVariable String id) {
		repository.deleteById(id);
		return "notification deleted with id : "+id;
	}
}
