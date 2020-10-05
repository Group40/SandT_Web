package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUploadPhoto is a Querydsl query type for UploadPhoto
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUploadPhoto extends EntityPathBase<UploadPhoto> {

    private static final long serialVersionUID = -261961269L;

    public static final QUploadPhoto uploadPhoto = new QUploadPhoto("uploadPhoto");

    public final DateTimePath<java.time.LocalDateTime> created = createDateTime("created", java.time.LocalDateTime.class);

    public final StringPath ownerEmail = createString("ownerEmail");

    public final StringPath ownername = createString("ownername");

    public final StringPath photourl = createString("photourl");

    public final StringPath picDetails = createString("picDetails");

    public final StringPath picTitle = createString("picTitle");

    public final NumberPath<Integer> review = createNumber("review", Integer.class);

    public final StringPath uploadPhotoId = createString("uploadPhotoId");

    public QUploadPhoto(String variable) {
        super(UploadPhoto.class, forVariable(variable));
    }

    public QUploadPhoto(Path<? extends UploadPhoto> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUploadPhoto(PathMetadata metadata) {
        super(UploadPhoto.class, metadata);
    }

}

