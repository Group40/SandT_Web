package com.api.repository;

import com.api.model.UploadPhoto;
import com.api.security.service.PicDetailsImpl;
import com.api.security.service.PicdataFindUsers;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Map;

public interface PhotoAlbumRepository extends PagingAndSortingRepository<UploadPhoto, String> {
   //List<PicDetailsImpl> findByownerEmail(String ownerEmail, Pageable paging);
    List<UploadPhoto> findByownerEmail(String ownerEmail, Pageable paging);
    List<UploadPhoto> findByphotourl(String url);
    List<PicDetailsImpl> findByreview(int review, Pageable paging);
    List<UploadPhoto> findByPicTitleIsLikeAllIgnoreCase(String picTitle, Pageable paging);
    List<PicDetailsImpl> findByreviewAndPicTitleIsLikeAllIgnoreCase(int review,String picTitle, Pageable paging);

   // List<Map<String,Object>> findByownerEmail(String ownerEmail, Pageable paging);


}
