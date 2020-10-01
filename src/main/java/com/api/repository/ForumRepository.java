package com.api.repository;

import java.util.List;

import com.api.model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ForumRepository extends MongoRepository<Forum, String> {
    @Query(value = "{'id': '$0', 'status': '0'}")
    void deleteById(String id);

    @Query(value = "{ 'status': '1'}", fields = "{'id': 1, 'title': 1, 'status': 1}")
	List<Forum> findByStatus();
}