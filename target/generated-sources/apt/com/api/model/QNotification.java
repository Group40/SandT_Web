package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNotification is a Querydsl query type for Notification
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QNotification extends EntityPathBase<Notification> {

    private static final long serialVersionUID = -1445479663L;

    public static final QNotification notification = new QNotification("notification");

    public final StringPath authorMail = createString("authorMail");

    public final StringPath authorName = createString("authorName");

    public final StringPath authorType = createString("authorType");

    public final StringPath date = createString("date");

    public final StringPath eventDate = createString("eventDate");

    public final StringPath id = createString("id");

    public final StringPath name = createString("name");

    public final StringPath nameType = createString("nameType");

    public QNotification(String variable) {
        super(Notification.class, forVariable(variable));
    }

    public QNotification(Path<? extends Notification> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNotification(PathMetadata metadata) {
        super(Notification.class, metadata);
    }

}

