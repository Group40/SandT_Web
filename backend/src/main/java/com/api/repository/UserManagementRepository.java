package com.api.repository;

import com.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserManagementRepository extends MongoRepository<User,String> {
    Optional<User> findById(String id);
    List<User> findByurole(Integer role);

}
