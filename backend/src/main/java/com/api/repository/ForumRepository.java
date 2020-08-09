package com.api.repository;

import java.util.List;

import com.api.model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ForumRepository extends MongoRepository<Forum, String> {
    @Query("{ 'startDateTime': '$timestamp'}")
	List<Forum> findByStartDate();
}