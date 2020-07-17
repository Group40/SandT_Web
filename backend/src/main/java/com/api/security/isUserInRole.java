package com.api.security;

import com.api.security.service.UserDetailsImpl;

public class isUserInRole {

    public static boolean isUserInRole(int role) {
        int authrole = UserDetailsImpl.getUrole();

        if(authrole == role){
            return true;
        }
        else {
            return false;
        }

    }

    //@Override
    public boolean isGranted(int role){
        return findrole(role);
    }

    public static boolean findrole(int role){
        int authrole = UserDetailsImpl.getUrole();

        if(authrole == role){
            return true;
        }
        else {
            return false;
        }

    }
}
