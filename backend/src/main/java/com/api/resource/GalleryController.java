package com.api.resource;

import com.amazonaws.services.applicationdiscovery.model.ResourceNotFoundException;
import com.api.model.UploadPhoto;
import com.api.repository.PhotoAlbumRepository;
import com.api.repository.PhotoDataFindRepository;
import com.api.repository.PhotoReviewRepository;
import com.api.repository.UploadPhotoRepository;
import com.api.security.service.PicDetailsImpl;
import com.api.service.AmazonImageService;
import com.api.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class GalleryController  {
    @Autowired private UploadPhotoRepository uploadPhotoRepository;

    @Autowired private PhotoAlbumRepository photoAlbumRepository;

    @Autowired private PhotoDataFindRepository photoDataFindRepository;

    @Autowired private GalleryService galleryService;

    @Autowired private PhotoReviewRepository photoReviewRepository;

    @Autowired private AmazonImageService amazonImageService;



/*
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/getAllpics")
    public List<UploadPhoto> getAllPics(){
        return uploadPhotoRepository.findTop3ByOrderByCreatedDesc();
    }

    @GetMapping("/getMypics/{email}")
    public List<UploadPhoto> getMyPics(@PathVariable String email){
        return uploadPhotoRepository.findByownerEmail(email);
    }
*/
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getMypicslist/{email}")
    public List<UploadPhoto> getMyPicslist(
            @PathVariable String email,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "3") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return galleryService.getMyPicspage2(email,pageNo,pageSize,sortBy);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/viewGallery")
    public List<PicDetailsImpl> viewGallery(
           // @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "3") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return (galleryService.viewPicslistpage(pageNo,pageSize,sortBy));
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/reviewPics")
    public List<UploadPhoto> reviewPics(
            // @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return (galleryService.reviewPics(pageNo,pageSize,sortBy));
    }

    @GetMapping("/review/picmobile")
    public List<PicDetailsImpl> reviewPicsMobile(
            // @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return (galleryService.reviewPicsMobile(pageNo,pageSize,sortBy));
    }

    @GetMapping("/serchPic/{search}")
    public List<PicDetailsImpl> serchPic(
            @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "3") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return galleryService.searchPicslistpage(search,pageNo,pageSize,sortBy);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/adminSerchPic/{search}")
    public List<UploadPhoto> adminSerchPic(
            @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return galleryService.adminSearchPicslistpage(search,pageNo,pageSize,sortBy);
    }
/*
    @PostMapping("/viewPicsdata")
    public List<PicdataFindUsers> viewPicsdata(
            @RequestPart(value = "url") String url){
        return photoDataFindRepository.findByphotourl(url);
    }*/

    @PostMapping("/viewPicsdata")
    public List<UploadPhoto> viewPicsdata(
            @RequestPart(value = "url") String url){
        return photoAlbumRepository.findByphotourl(url);
    }

    @PostMapping("/admin/viewPicsdata")
    public List<UploadPhoto> adminViewPicsdata(
            @RequestPart(value = "url") String url){
        return photoAlbumRepository.findByphotourl(url);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/editMyPic/{id}")
    public Optional<UploadPhoto> editMyPic(
            @PathVariable String id,
            @RequestParam(defaultValue = "") String email){
        return photoDataFindRepository.findByUploadPhotoIdAndOwnerEmail(id,email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/picreviewed/{id}")
    public String reviewdPic(@PathVariable String id) throws ResourceNotFoundException {
        UploadPhoto uploadPhoto = uploadPhotoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        uploadPhoto.setReview(1);
        uploadPhotoRepository.save(uploadPhoto);
        return "Done";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/picunreviewed/{id}")
    public String unreviewdPic(@PathVariable String id) throws ResourceNotFoundException {
        UploadPhoto uploadPhoto = uploadPhotoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        uploadPhoto.setReview(0);
        uploadPhotoRepository.save(uploadPhoto);
        return "Done";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/adminview")
    public List<UploadPhoto> adminGallery(
            // @PathVariable String search,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "uploadPhotoId") String sortBy) {
        return (galleryService.adminViewGallery(pageNo,pageSize,sortBy));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deletepic/{id}")
    public String deletePic(@PathVariable String id) throws ResourceNotFoundException {
        UploadPhoto uploadPhoto = uploadPhotoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        amazonImageService.imageDelete(uploadPhoto);
        return "Done";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deletepicuser/{id}")
    public String deletePicbyUploader(
            @PathVariable String id,
            @RequestParam (defaultValue = "") String email
           // @RequestParam String email
    ) throws ResourceNotFoundException {
        UploadPhoto uploadPhoto = photoDataFindRepository.findByUploadPhotoIdAndOwnerEmail(id,email).orElseThrow(() -> new ResourceNotFoundException("Can't Find image"));
        amazonImageService.imageDelete(uploadPhoto);
        return "Done";
    }

}