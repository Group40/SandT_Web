package com.api.resource;

import java.util.List;

import com.api.model.Forum;
import com.api.repository.ForumRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ForumController {
    
    @Autowired
    private ForumRepository repository;

    @PostMapping("/addForum")
    public String addForum(@RequestBody Forum forum) {
        repository.save(forum);
        return "added a forum";
    }

    @GetMapping("/getForums")
    public List<Forum> getAllForums() {
        return repository.findAll();
   }

}