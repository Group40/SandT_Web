package com.api.payload;

//import com.api.model.PhotoAlbum;
//import com.api.model.QPhotoAlbum;
//import com.github.gustavovitor.maker.repository.MongoSpecificationBase;
//import com.querydsl.core.BooleanBuilder;
//import com.querydsl.core.types.Predicate;
//
//
//import javax.management.ReflectionException;
//import javax.naming.ReferralException;
//
//import static java.util.Objects.nonNull;
//
//public class AlbumSpecification extends MongoSpecificationBase<PhotoAlbum> {
//    public AlbumSpecification(PhotoAlbum photoAlbum) throws ReflectionException {
//        super(photoAlbum);
//    }
//
//    @Override
//    public Predicate toPredicate(){
//        BooleanBuilder builder=new BooleanBuilder();
//        if(nonNull(getObject().getTitle())){
//            builder.and(QPhotoAlbum.photoAlbum.title.containsIgnoreCase(getObject().getTitle()));
//        }
//        return builder;
//    }
//}
