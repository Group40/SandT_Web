package com.api.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UserRoleUpdate {
    @NotBlank
    @NotNull
    private String id;

    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
