package com.api.repository;

import com.api.model.UploadPhoto;
import com.api.security.service.PicdataFindUsers;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PhotoDataFindRepository extends MongoRepository<UploadPhoto, String> {
    List<PicdataFindUsers> findByphotourl(String url);
    List<PicdataFindUsers> findByuploadPhotoId(String url);
}
