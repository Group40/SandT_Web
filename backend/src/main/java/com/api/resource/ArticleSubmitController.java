package com.api.resource;

import com.api.model.Article;
import com.api.model.Event;
import com.api.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticleSubmitController {
    @Autowired
    private ArticleRepository repository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addArticle")
    public String saveArticle(@RequestBody Article article) {
        repository.save(article);
        return "Added a new article";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllarticle")
    public List<Article> all(){
        return repository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deletearticle/{id}")
    public String deleteArticle(@PathVariable String id) {
        repository.deleteById(id);
        return "article deleted with id : "+id;
    }
}
