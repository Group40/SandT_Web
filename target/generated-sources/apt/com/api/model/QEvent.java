package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QEvent is a Querydsl query type for Event
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QEvent extends EntityPathBase<Event> {

    private static final long serialVersionUID = -1829716172L;

    public static final QEvent event = new QEvent("event");

    public final StringPath available = createString("available");

    public final StringPath date = createString("date");

    public final StringPath description = createString("description");

    public final StringPath headCount = createString("headCount");

    public final StringPath id = createString("id");

    public final StringPath name = createString("name");

    public final StringPath venue = createString("venue");

    public QEvent(String variable) {
        super(Event.class, forVariable(variable));
    }

    public QEvent(Path<? extends Event> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEvent(PathMetadata metadata) {
        super(Event.class, metadata);
    }

}

