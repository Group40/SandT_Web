package com.api.repository;

import com.api.model.Optics;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OpticsRepository extends MongoRepository<Optics,String> {
}
