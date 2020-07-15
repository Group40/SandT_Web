package com.api.security.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    public static int urole;


    //public String urole;

    private String id;

    private String username;
    private String lname;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;


    public UserDetailsImpl(String id, String username, String lname, String email, String password,
                           int urole /*String authorities Collection<? extends GrantedAuthority> authorities*/
    ) {
        this.id = id;
        this.username = username;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.urole = urole;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        String[] authorities = new String[]{("asa"), ("asasas")};
        //String authorities = user.getUrole();


        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getLname(),
                user.getEmail(),
                user.getPassword(),
                user.getUrole());
        // authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //return new ArrayList(Collections.singleton("USER"));
        return authorities;
    }

    //@Override
    public static int getUrole() {
        return urole;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getLname() {
        return lname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
