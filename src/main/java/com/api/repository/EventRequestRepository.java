package com.api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.model.EventRequest;

public interface EventRequestRepository extends MongoRepository<EventRequest, String>{
	List<EventRequest> findByEventId(String eventId);
	List<EventRequest> deleteByEventId(String eventId);
}
