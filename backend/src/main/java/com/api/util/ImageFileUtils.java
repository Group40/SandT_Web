package com.api.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Objects;

public class ImageFileUtils {
    public static File convertMulitiletoone(MultipartFile file) throws IOException{
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));

        FileOutputStream fileOutputStream = new FileOutputStream(convertedFile);
        fileOutputStream.write(file.getBytes());
        fileOutputStream.close();

        return convertedFile;
    }
    public static String genaratename(MultipartFile multipartFile){
        return new Date().getTime() + " - " + Objects.requireNonNull(multipartFile
                .getOriginalFilename()).replace("","");
    }


}
