package com.api.resource;

import java.util.List;

import javax.validation.Valid;

import com.api.model.Forum;
import com.api.repository.ForumRepository;
import com.api.security.jwt.JwtUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.var;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class ForumController {

    private static Log logger = LogFactory.getLog(ForumController.class);
    
    @Autowired
    private ForumRepository repository;

     @CrossOrigin(origins = "http://localhost:3000")
     @PostMapping("/addForum")
     public String addForum(@Valid @RequestBody Forum forum) {
        logger.debug(forum);
        repository.save(forum);
        return "added a forum";
     }

     @CrossOrigin(origins = "http://localhost:3000")
     @GetMapping("/getForums")
     public List<Forum> getAllForums() {
        return repository.findAll();
     }

     @CrossOrigin(origins = "http://localhost:3000")
     @DeleteMapping("/deleteForum/{id}")
     public String deleteForum(@PathVariable String id) {
        repository.deleteById(id);
        return "Deleted forum: " + id;
     }

     @GetMapping("/findByStartDate")
     public String findByStartDate() {
        repository.findByStartDate();
        return "Today\' forums";
     }

}