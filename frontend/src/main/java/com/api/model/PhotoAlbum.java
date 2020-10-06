package com.api.model;

import com.api.model.UploadPhoto;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Document
public class PhotoAlbum {

    @Id
    private String photoalbumId;

    @Size(max =64)
    @NotNull
    @NotBlank
    private String title;

    private List<UploadPhoto> photo;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
