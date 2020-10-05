package com.api.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -2136759311L;

    public static final QUser user = new QUser("user");

    public final StringPath email = createString("email");

    public final StringPath id = createString("id");

    public final StringPath lname = createString("lname");

    public final StringPath password = createString("password");

    public final StringPath role = createString("role");

    public final NumberPath<Integer> urole = createNumber("urole", Integer.class);

    public final StringPath username = createString("username");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

