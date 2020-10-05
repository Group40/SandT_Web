package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCourse is a Querydsl query type for Course
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCourse extends EntityPathBase<Course> {

    private static final long serialVersionUID = -949868863L;

    public static final QCourse course = new QCourse("course");

    public final StringPath ageGroupMax = createString("ageGroupMax");

    public final StringPath ageGroupMin = createString("ageGroupMin");

    public final ArrayPath<String[], String> commentedUsers = createArray("commentedUsers", String[].class);

    public final StringPath description = createString("description");

    public final StringPath id = createString("id");

    public final ArrayPath<String[], String> likedUsers = createArray("likedUsers", String[].class);

    public final StringPath location = createString("location");

    public final StringPath name = createString("name");

    public final StringPath price = createString("price");

    public final StringPath url = createString("url");

    public QCourse(String variable) {
        super(Course.class, forVariable(variable));
    }

    public QCourse(Path<? extends Course> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCourse(PathMetadata metadata) {
        super(Course.class, metadata);
    }

}

