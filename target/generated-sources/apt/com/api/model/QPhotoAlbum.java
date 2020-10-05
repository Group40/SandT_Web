package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotoAlbum is a Querydsl query type for PhotoAlbum
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPhotoAlbum extends EntityPathBase<PhotoAlbum> {

    private static final long serialVersionUID = -1270619389L;

    public static final QPhotoAlbum photoAlbum = new QPhotoAlbum("photoAlbum");

    public final ListPath<UploadPhoto, QUploadPhoto> photo = this.<UploadPhoto, QUploadPhoto>createList("photo", UploadPhoto.class, QUploadPhoto.class, PathInits.DIRECT2);

    public final StringPath photoalbumId = createString("photoalbumId");

    public final StringPath title = createString("title");

    public QPhotoAlbum(String variable) {
        super(PhotoAlbum.class, forVariable(variable));
    }

    public QPhotoAlbum(Path<? extends PhotoAlbum> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPhotoAlbum(PathMetadata metadata) {
        super(PhotoAlbum.class, metadata);
    }

}

