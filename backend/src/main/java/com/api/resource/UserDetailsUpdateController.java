package com.api.resource;

import com.amazonaws.services.applicationdiscovery.model.ResourceNotFoundException;
import com.api.model.User;
import com.api.payload.request.LoginRequest;
import com.api.payload.request.UserUpdateName;
import com.api.payload.response.JwtResponse;
import com.api.repository.UserRepository;
import com.api.security.jwt.JwtUtils;
import com.api.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/updateuser")
public class UserDetailsUpdateController {
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/name")
    public ResponseEntity<?> updateNameDetails(@Valid @RequestBody UserUpdateName userUpdateName)
            throws ResourceNotFoundException {
        User user = userRepository.findByEmail(userUpdateName
                .getEmail())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find Email ="+userUpdateName
                        .getEmail()));
        user.setUsername(userUpdateName.getUsername());
        user.setLname(userUpdateName.getLname());
        userRepository.save(user);

        return ResponseEntity.ok("Done");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/password")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody LoginRequest loginRequest)
            throws ResourceNotFoundException {
        User user = userRepository.findByEmail(loginRequest
                .getEmail())
                .orElseThrow(()-> new ResourceNotFoundException("Can't Find Email ="+loginRequest
                        .getEmail()));
        user.setPassword(encoder.encode(loginRequest.getPassword()));
        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getLname(),
                userDetails.getEmail(),
                userDetails.urole));
    }
}
