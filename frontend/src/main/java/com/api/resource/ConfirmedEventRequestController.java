package com.api.resource;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.model.ConfirmedEventRequest;
import com.api.repository.ConfirmedEventRequestRepository;
import com.api.service.NotificationService;

@RestController
public class ConfirmedEventRequestController {
	
	private Logger logger = LoggerFactory.getLogger(ConfirmedEventRequestController.class); 

	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private ConfirmedEventRequestRepository repository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addConfirmedEventRequest")
	public String saveEvent(@RequestBody ConfirmedEventRequest confirmedeventrequest) {
		repository.save(confirmedeventrequest);
		try {
			notificationService.sendNotification(confirmedeventrequest);
		}catch(MailException e) {
			logger.info("Error sending mail: "+e.getMessage());
		}
		return "Added a new event request";
	}
	
	@PostMapping("/updateConfirmedEventRequest")
	public String saveUpdatedEvent(@RequestBody ConfirmedEventRequest confirmedeventrequest) {
		repository.save(confirmedeventrequest);
		return "Update the confirmed event request";
	}
	
	@GetMapping("/getConfirmedEventRequests")
	public List<ConfirmedEventRequest> getConfirmedEventRequests(){
		return repository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getConfirmedEventRequestsByEventId/{id}")
	public List<ConfirmedEventRequest> getConfirmedEventRequestByEventId(@PathVariable String id){
		return repository.findByEventId(id);
	}
	
	@GetMapping("/getConfirmedEventRequests/{id}")
	public Optional<ConfirmedEventRequest> getConfirmedEventRequest(@PathVariable String id){
		return repository.findById(id);
	}
	
	@DeleteMapping("/deleteConfirmedEventRequest/{id}")
	public String deleteConfirmedEventRequest(@PathVariable String id) {
		repository.deleteById(id);
		return "confirmed event request deleted with id : "+id;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteConfirmedEventRequestByEventId/{id}")
	public String deleteConfirmedEventRequestByEventId(@PathVariable String id) {
		repository.deleteByEventId(id);
		return "confirmed event request deleted by event id : "+id;
	}
}
