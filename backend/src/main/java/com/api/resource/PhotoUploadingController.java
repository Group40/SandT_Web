package com.api.resource;

import com.api.model.UploadPhoto;
import com.api.payload.response.MessageResponse;
import com.api.service.AmazonImageService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<UploadPhoto>> insertphotos(@RequestPart(value = "image")List<MultipartFile> image) {
       // return (ResponseEntity<List<UploadPhoto>>) this.amazonImageService.insertphoto(image);
        return (ResponseEntity<List<UploadPhoto>>) this.amazonImageService.insertphoto(image);
    }
*/
    @PostMapping("/uploadpic")
    public MessageResponse uploadFile(@RequestPart(value = "image") MultipartFile file,
                                      @RequestPart(value = "email") String email,
                                       @RequestPart(value = "date") String date,
                                       @RequestPart(value = "town") String town,
                                       @RequestPart(value = "distric") String distric,
                                      @RequestPart(value = "name") String name,
                                      @RequestPart(value = "title") String title,
                                      @RequestPart(value = "detail") String detail) {

        return this.amazonImageService.UploadPhotoToAmazon(file,email,name,title,detail,0,date,town,distric);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/adminuploadpic")
    public ResponseEntity<?> adminphotoUpload(@RequestPart(value = "image") MultipartFile file,
                                              @RequestPart(value = "email") String email,
                                              @RequestPart(value = "name") String name,
                                              @RequestPart(value = "title") String title,
                                              @RequestPart(value = "date") String date,
                                              @RequestPart(value = "town") String town,
                                              @RequestPart(value = "distric") String distric,
                                              @RequestPart(value = "detail") String detail) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        if(user.getUrole()==3)
        {
            return ResponseEntity.ok(
                    this.amazonImageService
                            .UploadPhotoToAmazon(file,email,name,title,detail,1,date,town,distric));
        }
        else
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Your Not an admin"));
        }
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
