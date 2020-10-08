package com.api.repository;

import com.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserManagementRepository extends MongoRepository<User,String> {
    Optional<User> findById(String id);
    List<User> findByurole(Integer role);
    List<User> findByUroleAndEmailIsLikeAllIgnoreCase(Integer role,String email);
    //List<User> findByuroleAndEmailIsLikeAllIgnoreCaseOrUsernameIsLikeAllIgnoreCaseOrLnameIsLikeAllIgnoreCase(Integer role,String email,String fname,String lname);
}
