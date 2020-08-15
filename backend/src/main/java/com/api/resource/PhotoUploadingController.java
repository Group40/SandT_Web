package com.api.resource;

import com.amazonaws.services.applicationdiscovery.model.ResourceNotFoundException;
import com.api.model.UploadPhoto;
import com.api.payload.response.MessageResponse;
import com.api.repository.UploadPhotoRepository;
import com.api.service.AmazonImageService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/photouploading")
public class PhotoUploadingController {

    @Autowired
    private AmazonImageService amazonImageService;

    @Autowired
    private UploadPhotoRepository uploadPhotoRepository;
/*
    @PostMapping("/photo")
    public ResponseEntity<List<UploadPhoto>> insertphotos(
            ,
            @RequestPart(value = "email") String email,
            @RequestPart(value = "name") String name,
            @RequestPart(value = "title") String title,
            @RequestPart(value = "detail") String detail) List<MultipartFile> image) {
       // return (ResponseEntity<List<UploadPhoto>>) this.amazonImageService.insertphoto(image);
        return (ResponseEntity<List<UploadPhoto>>) this.amazonImageService.insertphoto(image,email,name,title,detail);
    }*/

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/uploadpic")
    public MessageResponse uploadFile(@RequestPart(value = "image") MultipartFile file,
                                      @RequestPart(value = "email") String email,
                                      @RequestPart(value = "name") String name,
                                      @RequestPart(value = "title") String title,
                                      @RequestPart(value = "detail") String detail) {

        return this.amazonImageService.UploadPhotoToAmazon(file,email,name,title,detail);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/updatedata")
    public String updateMyPic(//@PathVariable String id,
                              @RequestPart(value = "title") String title,
                              @RequestPart(value = "picid") String picid,
                              @RequestPart(value = "detail") String detail)
            throws ResourceNotFoundException {
        UploadPhoto uploadPhoto = uploadPhotoRepository.findById(picid).orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        uploadPhoto.setPicTitle(title);
        uploadPhoto.setPicDetails(detail);
        uploadPhotoRepository.save(uploadPhoto);
        return "Done";
    }

}
