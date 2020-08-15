package com.api.service;

import com.api.model.UploadPhoto;
import com.api.repository.PhotoAlbumRepository;
import com.api.repository.PhotoReviewRepository;
import com.api.security.service.PicDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GalleryService  {
    @Autowired
    private PhotoAlbumRepository photoAlbumRepository;

    @Autowired
    private PhotoReviewRepository photoReviewRepository;
/*
    public List<UploadPhoto> getMyPicspage(String email,Integer pageno,Integer pagesize,String sortBy){
       // Pageable pageable = PageRequest.of(pageno,pagesize);
        //List<UploadPhoto> pageresult = photoAlbumRepository.findAll();

        return photoAlbumRepository.findAll((PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending()))).getContent();

    }*/

    public List<UploadPhoto> getMyPicspage2(String email,Integer pageno,Integer pagesize,String sortBy){
        // Pageable pageable = PageRequest.of(pageno,pagesize);
        //Slice<UploadPhoto> slice = photoAlbumRepository.findByownerEmail(email,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        //List<UploadPhoto> pageresult = photoAlbumRepository.findAll();

        //var list = photoAlbumRepository.findByownerEmail(email,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));

        var list = photoAlbumRepository.findByownerEmail(email,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;



    }
    public List<PicDetailsImpl> viewPicslistpage(Integer pageno, Integer pagesize, String sortBy){

        var list = photoAlbumRepository.findByreview(1,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;
    }

    public List<PicDetailsImpl> searchPicslistpage(String search,Integer pageno, Integer pagesize, String sortBy){

        var list = photoAlbumRepository.findByreviewAndPicTitleIsLikeAllIgnoreCase(1,search,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;
    }

    public List<UploadPhoto> adminSearchPicslistpage(String search,Integer pageno, Integer pagesize, String sortBy){

        var list = photoReviewRepository.findByreviewAndPicTitleIsLikeAllIgnoreCase(1,search,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;
    }

    public List<UploadPhoto> reviewPics(Integer pageno, Integer pagesize, String sortBy){

        var list = photoReviewRepository.findByreview(0,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;
    }

    public List<UploadPhoto> adminViewGallery(Integer pageno, Integer pagesize, String sortBy){

        var list = photoReviewRepository.findByreview(1,(PageRequest.of(pageno,pagesize, Sort.by(sortBy).descending())));
        return list;
    }



    /*9
    public List<Map<String,Object>> selectPicDetails(List<UploadPhoto> list){
        PicDetailsImpl picDetails;


        return picDetails.getPhotourl();
    }

*/
}
