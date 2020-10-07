package com.api.resource;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import javax.validation.Valid;

import com.amazonaws.services.glacier.model.ResourceNotFoundException;
import com.api.model.Forum;
import com.api.repository.ForumRepository;

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
import com.api.service.ForumService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class ForumController {

   private static Log logger = LogFactory.getLog(ForumController.class);

   @Autowired
   private ForumRepository repository;

   @Autowired
   private ForumService forumService;

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
   @GetMapping("/getById/{id}")
   public Optional<Forum> getForums(@PathVariable String id) {
      return repository.findById(id);
   }

   @CrossOrigin(origins = "http://localhost:3000")
   @DeleteMapping("/deleteForum/{id}")
   public String deleteForum(@PathVariable String id) {
      repository.deleteById(id);
      return "Deleted forum: " + id;
   }

   @CrossOrigin(origins = "http://localhost:3000")
   @GetMapping("/findByStatus/{status}")
   public List<Forum> findByStatus(@PathVariable String status) {
      return repository.findByStatus(status);
   }

   @CrossOrigin(origins = "http://localhost:3000")
   @PostMapping("/sendForumID/{id}")
   public String sendID(@PathVariable String id) throws InterruptedException, ExecutionException {

      Forum forum = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Forum not found for this id: " + id));
      forum.setStatus("1");
      repository.save(forum);

      return forumService.sendForumID(id);
      // return "Added forum: " + id;
     }

   @CrossOrigin(origins = "http://localhost/3000")
   @PostMapping("endForumID/{id}")
   public String endID(@PathVariable String id) throws InterruptedException, ExecutionException {

      Forum forum = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Forum not found for this id: " + id));
      forum.setStatus("2");
      repository.save(forum);

      return forumService.endForumID(id);
      // return "Ended forum: " + id;
   }

}