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

import com.api.model.EventRequest;
import com.api.repository.EventRequestRepository;

@RestController
public class EventRequestController {

	@Autowired
	private EventRequestRepository repository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addEventRequest")
	public String saveEvent(@RequestBody EventRequest eventrequest) {
		repository.save(eventrequest);
		return "Added a new event request";
	}
	
	@PostMapping("/updateEventRequest")
	public String saveUpdatedEvent(@RequestBody EventRequest eventrequest) {
		repository.save(eventrequest);
		return "Update the event request";
	}
	
	@GetMapping("/getEventRequests")
	public List<EventRequest> getEventRequests(){
		return repository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getEventRequestsByEventId/{id}")
	public List<EventRequest> getEventRequestByEventId(@PathVariable String id){
		return repository.findByEventId(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getEventRequests/{id}")
	public Optional<EventRequest> getEventRequest(@PathVariable String id){
		return repository.findById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteEventRequest/{id}")
	public String deleteEventRequest(@PathVariable String id) {
		repository.deleteById(id);
		return "event request deleted with id : "+id;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteEventRequestByEventId/{id}")
	public String deletEventRequestByEventId(@PathVariable String id) {
		repository.deleteByEventId(id);
		return "confirmed event request deleted by event id : "+id;
	}
}
