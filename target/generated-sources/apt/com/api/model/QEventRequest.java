package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QEventRequest is a Querydsl query type for EventRequest
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QEventRequest extends EntityPathBase<EventRequest> {

    private static final long serialVersionUID = -36763461L;

    public static final QEventRequest eventRequest = new QEventRequest("eventRequest");

    public final StringPath email = createString("email");

    public final StringPath eventDate = createString("eventDate");

    public final StringPath eventId = createString("eventId");

    public final StringPath eventName = createString("eventName");

    public final StringPath heads = createString("heads");

    public final StringPath id = createString("id");

    public final StringPath name = createString("name");

    public final StringPath number = createString("number");

    public QEventRequest(String variable) {
        super(EventRequest.class, forVariable(variable));
    }

    public QEventRequest(Path<? extends EventRequest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEventRequest(PathMetadata metadata) {
        super(EventRequest.class, metadata);
    }

}

