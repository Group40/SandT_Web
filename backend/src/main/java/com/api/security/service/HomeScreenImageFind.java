package com.api.security.service;

import com.api.model.AppHomeScreen;

public class HomeScreenImageFind {
    private String imageurl;

    public HomeScreenImageFind(String imageurl) {
        this.imageurl = imageurl;
    }

    public static HomeScreenImageFind build(AppHomeScreen appHomeScreen){
        return new HomeScreenImageFind(appHomeScreen.getImageurl());
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }
}
