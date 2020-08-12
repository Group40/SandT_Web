
package com.api.security.service;

import com.api.model.UploadPhoto;

public class PicDetailsImpl {
   // private String uploadPhotoId;
    private String photourl;
   // private String picTitle;
   // private String ownerEmail;

    public PicDetailsImpl( String photourl) {
       // this.uploadPhotoId = uploadPhotoId;
        //this.ownerEmail=ownerEmail;
        this.photourl = photourl;
       // this.picTitle = picTitle;
    }//String uploadPhotoId, String photourl, String picTitle

    public static PicDetailsImpl build(UploadPhoto uploadPhoto){
        return new PicDetailsImpl(
              //  uploadPhoto.getUploadPhotoId(),
             //   uploadPhoto.getOwnerEmail(),
                uploadPhoto.getPhotourl()
              //  uploadPhoto.getPicTitle()
        );
    }
/*
    public String getUploadPhotoId() {
        return uploadPhotoId;
    }

    public void setUploadPhotoId(String uploadPhotoId) {
        this.uploadPhotoId = uploadPhotoId;
    }
*/
    public String getPhotourl() {
        return photourl;
    }

    public void setPhotourl(String photourl) {
        this.photourl = photourl;
    }
/*
    public String getPicTitle() {
        return picTitle;
    }

    public void setPicTitle(String picTitle) {
        this.picTitle = picTitle;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }*/
}
