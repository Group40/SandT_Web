package com.api.repository;

import java.util.List;

import com.api.model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForumRepository extends MongoRepository<Forum, String> {
    List<Forum> findByDate(String date);
}