package com.api.resource;

import com.amazonaws.services.applicationdiscovery.model.ResourceNotFoundException;
import com.api.model.User;
import com.api.payload.request.UserRoleUpdate;
import com.api.repository.UserManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/userupdate")
public class UserManagementController {
    @Autowired
    private UserManagementRepository userManagementRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/tocrew")
    public ResponseEntity<?> updateCrewMember(@Valid @RequestBody UserRoleUpdate userRoleUpdate)
            throws ResourceNotFoundException {
        User user = userManagementRepository.findById(userRoleUpdate
                .getId())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find User"));
        user.setUrole(2);
        userManagementRepository.save(user);
        return ResponseEntity.ok("Done");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/toadmin")
    public ResponseEntity<?> updateAdminMember(@Valid @RequestBody UserRoleUpdate userRoleUpdate)
            throws ResourceNotFoundException {
        User user = userManagementRepository.findById(userRoleUpdate
                .getId())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find User"));
        user.setUrole(3);
        userManagementRepository.save(user);
        return ResponseEntity.ok("Done");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/toblock")
    public ResponseEntity<?> blockuser(@Valid @RequestBody UserRoleUpdate userRoleUpdate)
            throws ResourceNotFoundException {
        User user = userManagementRepository.findById(userRoleUpdate
                .getId())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find User"));
        user.setUrole(0);
        userManagementRepository.save(user);
        return ResponseEntity.ok("Done");
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/touser")
    public ResponseEntity<?> unBlock(@Valid @RequestBody UserRoleUpdate userRoleUpdate)
            throws ResourceNotFoundException {
        User user = userManagementRepository.findById(userRoleUpdate
                .getId())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find User"));
        user.setUrole(1);
        userManagementRepository.save(user);
        return ResponseEntity.ok("Done");
    }
}
