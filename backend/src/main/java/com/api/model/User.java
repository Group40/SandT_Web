package com.api.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(min=3,max = 20)
    private String username;


    @Size(max = 20)
    private String lname;

    @NotBlank
    @Size(min=4,max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min=8,max = 120)
    private String password;


    private int urole;;


    public User() {
    }

    public User(@NotBlank @Size(max = 20) String username, @Size(max = 20) String lname, @NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 120) String password) {
        this.username = username;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.urole = 1;//"ROLE_USER";
    }

    public int getUrole() {
        return urole;
    }

    public void setUrole(int urole) {
        this.urole = urole;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
