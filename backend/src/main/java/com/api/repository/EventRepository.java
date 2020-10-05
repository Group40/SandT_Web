package com.api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.model.Event;
import com.api.model.EventRequest;

public interface EventRepository extends MongoRepository<Event, String>{
	List<Event> findByDate(String eventDate);
}
