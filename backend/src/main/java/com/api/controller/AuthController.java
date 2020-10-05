package com.api.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import com.api.model.User;
import com.api.payload.request.LoginRequest;
import com.api.payload.request.SignupRequest;
import com.api.payload.response.JwtResponse;
import com.api.payload.response.MessageResponse;
import com.api.repository.UserRepository;
import com.api.security.jwt.JwtUtils;
import com.api.security.service.UserDetailsImpl;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

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

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {


        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getLname(),signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        //Login details
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getLname(),
                userDetails.getEmail(),
                userDetails.urole));

        //return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkadminrole")
    public ResponseEntity<?> adminRole(@RequestPart(value = "email") String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        if(user.getUrole()==3)
        {
            return ResponseEntity.ok(new MessageResponse("Admin Member"));

        }
        else
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Your Not an admin"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkcrewrole")
    public ResponseEntity<?> crewRole(@RequestPart(value = "email") String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        if(user.getUrole()==2)
        {
            return ResponseEntity.ok(new MessageResponse("Crew Member"));

        }
        else
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Your Not a Crew Member"));
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/checkrole")
    public ResponseEntity<?> checkRole(
            @RequestParam String email
    ){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        if(user.getUrole()==3)
        {
            return ResponseEntity.ok(new MessageResponse("Admin Member"));

        }
        else if(user.getUrole()==2)
        {
            return ResponseEntity.ok(new MessageResponse("Crew Member"));

        }
        else if(user.getUrole()==1)
        {
            return ResponseEntity.ok(new MessageResponse("Member"));
        }
        else
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Your Not a Member"));
        }
    }
}
