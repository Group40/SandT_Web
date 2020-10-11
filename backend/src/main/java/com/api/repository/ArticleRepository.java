package com.api.repository;

import com.api.model.Event;
import org.springframework.data.mongodb.core.MongoAdminOperations;
import com.api.model.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ArticleRepository extends MongoRepository<Article, String> {
    //List<Article> findByDate(String eventDate);

}
