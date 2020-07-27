package com.api.service.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class InvalidPhotoExtensionException extends RuntimeException {
    List<String> validExtension;

    public InvalidPhotoExtensionException(List<String> validExtension){
        this.validExtension=validExtension;
    }
}
