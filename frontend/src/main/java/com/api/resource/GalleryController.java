package com.api.resource;

import com.api.model.EventRequest;
import com.api.model.PhotoAlbum;
//import com.api.service.GalleryService;
import com.api.model.UploadPhoto;
import com.api.repository.PhotoAlbumRepository;
import com.api.repository.UploadPhotoRepository;
import com.api.security.service.PicDetailsImpl;
import com.api.service.GalleryService;
import com.github.gustavovitor.maker.resource.MongoResourceMaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GalleryController  {
    @Autowired private UploadPhotoRepository repository;

    @Autowired private GalleryService galleryService;



    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/getAllpics")
    public List<UploadPhoto> getAllPics(){
        return repository.findTop3ByOrderByCreatedDesc();
    }
    @GetMapping("/getMypics/{email}")
    public List<UploadPhoto> getMyPics(@PathVariable String email){
        return repository.findByownerEmail(email);
    }


    @GetMapping("/getMypicslist/{email}")
    public List<UploadPhoto> getMyPicslist(
            @PathVariable String email,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "3") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return galleryService.getMyPicspage2(email,pageNo,pageSize,sortBy);
    }

}
//extends MongoResourceMaker<GalleryService, PhotoAlbum,String,PhotoAlbum>