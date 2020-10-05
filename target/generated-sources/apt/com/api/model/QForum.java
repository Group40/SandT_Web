package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QForum is a Querydsl query type for Forum
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QForum extends EntityPathBase<Forum> {

    private static final long serialVersionUID = -1828988485L;

    public static final QForum forum = new QForum("forum");

    public final StringPath date = createString("date");

    public final StringPath id = createString("id");

    public final StringPath startDate = createString("startDate");

    public final StringPath startTime = createString("startTime");

    public final StringPath status = createString("status");

    public final StringPath title = createString("title");

    public QForum(String variable) {
        super(Forum.class, forVariable(variable));
    }

    public QForum(Path<? extends Forum> path) {
        super(path.getType(), path.getMetadata());
    }

    public QForum(PathMetadata metadata) {
        super(Forum.class, metadata);
    }

}

