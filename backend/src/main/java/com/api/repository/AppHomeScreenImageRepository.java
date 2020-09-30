package com.api.repository;

import com.api.model.AppHomeScreen;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppHomeScreenImageRepository extends MongoRepository<AppHomeScreen,String> {
}
