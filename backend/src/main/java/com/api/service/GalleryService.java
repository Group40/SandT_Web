package com.api.service;

import com.api.model.UploadPhoto;
import com.api.repository.PhotoAlbumRepository;
import com.api.repository.UploadPhotoRepository;
import com.api.security.service.PicDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;

@Service
public class GalleryService  {
    @Autowired
    private PhotoAlbumRepository photoAlbumRepository;
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
    /*9
    public List<Map<String,Object>> selectPicDetails(List<UploadPhoto> list){
        PicDetailsImpl picDetails;


        return picDetails.getPhotourl();
    }

*/
}
