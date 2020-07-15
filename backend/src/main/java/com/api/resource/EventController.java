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

import com.api.model.Event;
import com.api.repository.EventRepository;

@RestController
public class EventController {

	@Autowired
	private EventRepository repository;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addEvent")
	public String saveEvent(@RequestBody Event event) {
		repository.save(event);
		return "Added a new event";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/updateEvent")
	public String saveUpdatedEvent(@RequestBody Event event) {
		repository.save(event);
		return "Update the event";
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAllEvents")
	public List<Event> getEvents(){
		return repository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findEventsByDate/{date}")
	public List<Event> getEventsByDate(@PathVariable String date){	
		return repository.findByDate(date);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAllEvents/{id}")
	public Optional<Event> getEvent(@PathVariable String id){
		return repository.findById(id);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteEvent/{id}")
	public String deleteEvent(@PathVariable String id) {
		repository.deleteById(id);
		return "event deleted with id : "+id;
	}
}
