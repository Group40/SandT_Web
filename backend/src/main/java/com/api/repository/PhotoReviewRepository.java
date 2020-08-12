package com.api.repository;

import com.api.model.UploadPhoto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface PhotoReviewRepository extends PagingAndSortingRepository<UploadPhoto,String> {
    List<UploadPhoto> findByreview(int review, Pageable paging);
    List<UploadPhoto> findByuploadPhotoId(String id);
}
