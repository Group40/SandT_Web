package com.api.security.service;
import com.api.model.AppHomeScreen;
public class ScrollImageFind {
    private String imageurl;

    public ScrollImageFind(String imageurl) {
        this.imageurl = imageurl;
    }

    public static ScrollImageFind build(AppHomeScreen appHomeScreen){
        return new ScrollImageFind(appHomeScreen.getImageurl());
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }
}
