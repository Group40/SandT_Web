package com.api.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.api.model.UploadPhoto;
import com.api.payload.response.MessageResponse;
import com.api.repository.PhotoAlbumRepository;
import com.api.repository.UploadPhotoRepository;
import com.api.service.exception.FileConversionException;
import com.api.util.ImageFileUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Log4j2
@Service
public class AmazonImageService extends AmazonClientService{
    @Autowired
    private UploadPhotoRepository uploadPhotoRepository;
/*
    public MessageResponse insertphoto(List<MultipartFile> photos,String email,String name,String title,String details){
        List<UploadPhoto> uploadPhotos = new ArrayList<UploadPhoto>();
        photos.forEach(photo -> uploadPhotos.add(MultiUploadPhotoToAmazon(photo,email,name,title,details)));
        return new MessageResponse("Your image has been successfully uploaded");
    }*/

    public MessageResponse UploadPhotoToAmazon(MultipartFile multipartFile, String email, String name, String title, String details) {

        List<String> validExtensions = Arrays.asList("jpeg", "jpg", "png");

        String extensions = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if(!validExtensions.contains(extensions)){
            //add warning msg
            //throw new InvalidPhotoExtensionException(validExtensions);
            return null;
        }
        else{
            String url =uploadMultipartFile(multipartFile);

            UploadPhoto uploadPhoto =new UploadPhoto();

            uploadPhoto.setPhotourl(url);
            uploadPhoto.setOwnerEmail(email);
            uploadPhoto.setOwnername(name);
            uploadPhoto.setPicTitle(title);
            uploadPhoto.setPicDetails(details);
            uploadPhoto.setReview(0);
            uploadPhotoRepository.insert(uploadPhoto);

            return new MessageResponse("Your image has been successfully uploaded");
        }
    }

    private String uploadMultipartFile(MultipartFile multipartFile) {
        String picurl = "";

        try{
            File file =ImageFileUtils.convertMulitiletoone(multipartFile);
            String photoname =ImageFileUtils.genaratename(multipartFile);
            picurl = getUrl().concat(photoname);
            uploadPublicPhoto(photoname, file);
            file.delete();
        }
         catch (IOException e) {
             //new MessageResponse("Can't Convert files");
             throw new FileConversionException();
            //////Add here
        }
        return picurl;

    }

    private void uploadPublicPhoto(String photoname, File file) {
        getClient().putObject(new PutObjectRequest(getBucketname(),photoname,file)
        .withCannedAcl(CannedAccessControlList.PublicRead));

    }
/*
    public UploadPhoto MultiUploadPhotoToAmazon(MultipartFile multipartFile, String email, String name, String title, String details) {

        List<String> validExtensions = Arrays.asList("jpeg", "jpg", "png");

        String extensions = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if(!validExtensions.contains(extensions)){
            //add warning msg
            //throw new InvalidPhotoExtensionException(validExtensions);
            return null;
        }
        else{
            String url =uploadMultipartFile(multipartFile);

            UploadPhoto uploadPhoto =new UploadPhoto();

            uploadPhoto.setPhotourl(url);
            uploadPhoto.setOwnerEmail(email);
            uploadPhoto.setOwnername(name);
            uploadPhoto.setPicTitle(title);
            uploadPhoto.setPicDetails(details);
            uploadPhoto.setReview(0);
            uploadPhotoRepository.insert(uploadPhoto);

            return uploadPhotoRepository.insert(uploadPhoto);
        }
    }*/
/*
    //ToDo
    public void imageDelete(UploadPhoto uploadPhoto){
        String picname =uploadPhoto.getPhotourl().substring(uploadPhoto.getPhotourl().lastIndexOf("/")+1);
        uploadPhotoRepository.delete(uploadPhoto);
    }
*/

}
