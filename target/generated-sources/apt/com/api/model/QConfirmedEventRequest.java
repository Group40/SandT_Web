package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QConfirmedEventRequest is a Querydsl query type for ConfirmedEventRequest
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QConfirmedEventRequest extends EntityPathBase<ConfirmedEventRequest> {

    private static final long serialVersionUID = -2132529106L;

    public static final QConfirmedEventRequest confirmedEventRequest = new QConfirmedEventRequest("confirmedEventRequest");

    public final StringPath email = createString("email");

    public final StringPath eventDate = createString("eventDate");

    public final StringPath eventId = createString("eventId");

    public final StringPath eventName = createString("eventName");

    public final StringPath heads = createString("heads");

    public final StringPath id = createString("id");

    public final StringPath name = createString("name");

    public final StringPath number = createString("number");

    public QConfirmedEventRequest(String variable) {
        super(ConfirmedEventRequest.class, forVariable(variable));
    }

    public QConfirmedEventRequest(Path<? extends ConfirmedEventRequest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QConfirmedEventRequest(PathMetadata metadata) {
        super(ConfirmedEventRequest.class, metadata);
    }

}

