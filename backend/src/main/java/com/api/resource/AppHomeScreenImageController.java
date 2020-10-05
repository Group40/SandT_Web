package com.api.resource;

import com.amazonaws.services.applicationdiscovery.model.ResourceNotFoundException;
import com.api.model.AppHomeScreen;
import com.api.repository.AppHomeScreenImageRepository;
import com.api.security.service.HomeScreenImageFind;
import com.api.service.AppHomeScreenImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/appimage")
public class AppHomeScreenImageController {
    @Autowired
    private AppHomeScreenImageService homeScreenImageService;

    @Autowired
    private AppHomeScreenImageRepository imageRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestPart(value = "image") MultipartFile file,
            @RequestPart(value = "email") String email){
        return ResponseEntity.ok().body(homeScreenImageService.uploadImageToAmazon(file,email));

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable String id){
        AppHomeScreen appHomeScreen= imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        homeScreenImageService.imageDelete(appHomeScreen);
        return ResponseEntity.ok("Done");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/view")
    public List<AppHomeScreen> appAdminView(){
        return imageRepository.findAll();
    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/view")
//    public List<HomeScreenImageFind> appView(){
//        return imageRepository.findAll();
//    }

}
