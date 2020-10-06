package com.api.repository;

import java.util.List;
import java.util.Optional;

import com.api.model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForumRepository extends MongoRepository<Forum, String> {
    void deleteById(String id);

    List<Forum> findByStatus(String status);

    Optional<Forum> findById(String id);
   
}