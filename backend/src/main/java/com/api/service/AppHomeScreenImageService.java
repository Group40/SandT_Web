package com.api.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.api.model.AppHomeScreen;
import com.api.repository.AppHomeScreenImageRepository;
import com.api.service.exception.FileConversionException;
import com.api.util.ImageFileUtils;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Log4j2
@Service
public class AppHomeScreenImageService extends AmazonClientService {
    @Autowired
    private AppHomeScreenImageRepository homeScreenImageRepository;

    public ResponseEntity<?> uploadImageToAmazon(MultipartFile multipartFile,String email){
        List<String> validExtensions = Arrays.asList("jpeg","JPEG", "jpg","JPG", "png","PNG");
        String extensions = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if(!validExtensions.contains(extensions)){

            return ResponseEntity.badRequest().body("Invalid Image");
        }
        else {
            String url =uploadMultipartFile(multipartFile);

            AppHomeScreen appHomeScreen = new AppHomeScreen();
            appHomeScreen.setImageurl(url);
            appHomeScreen.setUploaderEmail(email);
            homeScreenImageRepository.insert(appHomeScreen);

            return ResponseEntity.ok("Done");
        }
    }

    private String uploadMultipartFile(MultipartFile multipartFile) {
        String picurl = "";

        try{
            File file = ImageFileUtils.convertMulitiletoone(multipartFile);
            String photoname =ImageFileUtils.genaratename(multipartFile);
            picurl = getUrl().concat(photoname);
            uploadPublicPhoto(photoname, file);
            file.delete();
        }
        catch (IOException e) {
            throw new FileConversionException();
        }
        return picurl;

    }
    private void uploadPublicPhoto(String photoname, File file) {
        getClient().putObject(new PutObjectRequest(getBucketname(),photoname,file)
                .withCannedAcl(CannedAccessControlList.PublicRead));

    }

    public void imageDelete(AppHomeScreen appHomeScreen){
        String picname =appHomeScreen.getImageurl().substring(appHomeScreen.getImageurl().lastIndexOf("/")+1);
        getClient().deleteObject(new DeleteObjectRequest(getBucketname(),picname));
        homeScreenImageRepository.delete(appHomeScreen);
    }
}
