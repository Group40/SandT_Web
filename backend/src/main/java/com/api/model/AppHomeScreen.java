package com.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Document(collection = "AppHomeScreen")
public class AppHomeScreen {
    @Id
    private String id;

    @NotNull
    private String imageurl;

    @NotNull
    @Email
    private String uploaderEmail;

    public AppHomeScreen(String id, @NotNull String imageurl, @NotNull @Email String uploaderEmail) {
        this.id = id;
        this.imageurl = imageurl;
        this.uploaderEmail = uploaderEmail;
    }
    public AppHomeScreen(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    public String getUploaderEmail() {
        return uploaderEmail;
    }

    public void setUploaderEmail(String uploaderEmail) {
        this.uploaderEmail = uploaderEmail;
    }
}
