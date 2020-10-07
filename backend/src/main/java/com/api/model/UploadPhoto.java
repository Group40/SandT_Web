package com.api.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Document(collection  = "uploadPhoto")
public class UploadPhoto {
    @Id
    private String uploadPhotoId;
    LocalDateTime created;

    @NotNull
    private String photourl;

    @NotNull
    private String picTitle;

    private String picDetails;

    private String town;
    private String distric;
    private String date;

    @NotNull
    @Email
    private String ownerEmail;

    private String ownername;

    private int review;

    public UploadPhoto(String uploadPhotoId, @NotNull String photourl, @NotNull String picTitle, String picDetails, @NotNull @Email String ownerEmail, String ownername) {
        this.uploadPhotoId = uploadPhotoId;
        this.photourl = photourl;
        this.picTitle = picTitle;
        this.picDetails = picDetails;
        this.ownerEmail = ownerEmail;
        this.ownername = ownername;
    }
    public UploadPhoto(){}

    public String getUploadPhotoId() {
        return uploadPhotoId;
    }

    public void setUploadPhotoId(String uploadPhotoId) {
        this.uploadPhotoId = uploadPhotoId;
    }

    public String getPhotourl() {
        return photourl;
    }

    public void setPhotourl(String photourl) {
        this.photourl = photourl;
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

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public int getReview() {
        return review;
    }

    public void setReview(int review) {
        this.review = review;
    }

    public String getOwnername() {
        return ownername;
    }

    public void setOwnername(String ownername) {
        this.ownername = ownername;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getDistric() {
        return distric;
    }

    public void setDistric(String distric) {
        this.distric = distric;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
