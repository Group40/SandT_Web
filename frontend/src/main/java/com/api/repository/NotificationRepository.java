package com.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.api.model.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String>{
}
