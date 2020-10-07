package com.api.repository;

import com.api.model.UploadPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UploadPhotoRepository extends MongoRepository<UploadPhoto, String> {
    List<UploadPhoto> findByownerEmail(String ownerEmail);
    List<UploadPhoto> findTop3ByOrderByCreatedDesc();


}
