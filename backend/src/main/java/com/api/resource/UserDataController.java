package com.api.resource;

import com.api.model.User;
import com.api.repository.UserManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userdata")

public class UserDataController {
    @Autowired
    private UserManagementRepository repository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/finduser")
    public List<User> findUsers() {
        return repository.findByurole(1);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/searchuser/{email}")
    public List<User> searchUsers(@PathVariable String email) {
        return repository.findByUroleAndEmailIsLikeAllIgnoreCase(1,email);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findcrew")
    public List<User> findCrew() {
        return repository.findByurole(2);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/searchcrew/{email}")
    public List<User> searchCrew(@PathVariable String email) {
        return repository.findByUroleAndEmailIsLikeAllIgnoreCase(2,email);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findadmin")
    public List<User> findAdmin() {
        return repository.findByurole(3);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/searchadmin/{email}")
    public List<User> searchAdmin(@PathVariable String email) {
        return repository.findByUroleAndEmailIsLikeAllIgnoreCase(3,email);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findblock")
    public List<User> findBlockusers() {
        return repository.findByurole(0);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/searchblock/{email}")
    public List<User> searchBlockusers(@PathVariable String email) {
        return repository.findByUroleAndEmailIsLikeAllIgnoreCase(0,email);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findall")
    public List<User> findall() {
        return repository.findAll();
    }

}