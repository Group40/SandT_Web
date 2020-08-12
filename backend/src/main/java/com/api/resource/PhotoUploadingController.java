package com.api.resource;

import com.api.model.UploadPhoto;
import com.api.payload.response.MessageResponse;
import com.api.service.AmazonImageService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@RestController
@RequestMapping("/photouploading")
public class PhotoUploadingController {

    @Autowired
    private AmazonImageService amazonImageService;
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

    @PostMapping("/uploadpic")
    public MessageResponse uploadFile(@RequestPart(value = "image") MultipartFile file,
                                      @RequestPart(value = "email") String email,
                                      @RequestPart(value = "name") String name,
                                      @RequestPart(value = "title") String title,
                                      @RequestPart(value = "detail") String detail) {

        return this.amazonImageService.UploadPhotoToAmazon(file,email,name,title,detail);
    }

}
