package com.api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.model.ConfirmedEventRequest;

public interface ConfirmedEventRequestRepository extends MongoRepository<ConfirmedEventRequest, String>{
	List<ConfirmedEventRequest> findByEventId(String eventId);
	List<ConfirmedEventRequest> deleteByEventId(String eventId);
}
