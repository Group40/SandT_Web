package com.api.security.service;

import com.api.model.UploadPhoto;

public class PicdataFindUsers {
    private String ownername;
    private String picTitle;
    private String picDetails;
    private String uploadPhotoId;


    public PicdataFindUsers(String ownername, String picTitle, String picDetails,String uploadPhotoId) {
        this.ownername = ownername;
        this.picTitle = picTitle;
        this.picDetails = picDetails;
        this.uploadPhotoId =uploadPhotoId;
    }

    public static PicdataFindUsers build(UploadPhoto uploadPhoto) {
        return new PicdataFindUsers(uploadPhoto.getOwnername(),
                uploadPhoto.getPicTitle(),
                uploadPhoto.getPicDetails(),
                uploadPhoto.getUploadPhotoId()
        );
    }

    public String getOwnername() {
        return ownername;
    }

    public void setOwnername(String ownername) {
        this.ownername = ownername;
    }

    public String getPicTitle() {
        return picTitle;
    }

    public void setPicTitle(String picTitle) {
        this.picTitle = picTitle;
    }

    public String getPicDetails() {
        return picDetails;
    }

    public void setPicDetails(String picDetails) {
        this.picDetails = picDetails;
    }

    public String getUploadPhotoId() {
        return uploadPhotoId;
    }

    public void setUploadPhotoId(String uploadPhotoId) {
        this.uploadPhotoId = uploadPhotoId;
    }
}
