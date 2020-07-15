//User role- 1-user/ 2-crew / 3-Admin
package com.api.controller;

import com.api.security.jwt.JwtUtils;
import com.api.security.service.UserDetailsImpl;
import com.api.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class OtherController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;



    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }


    @GetMapping(value = "/user")
    public String UserLevel (@RequestHeader(name="Authorization") String token) {
        if (jwtUtils.validateJwtToken(token)) {
            String tokenemail = jwtUtils.getEmailFromJwtToken(token);//// user email
            UserDetails userDetails = userDetailsService.loadUserByUsername(tokenemail);

            final int urole = UserDetailsImpl.getUrole();

            if(urole== 1){
                String name = userDetails.getUsername();// User Name
                /////////////Add Users Funcions
                return "User";

            }
            else if (urole == 2){
                return "Crew";
                ////////////////////////add crew funcion
            }
            else if (urole == 3){
                /////////////////Admin fun
                return "Admin";
            }
        }
        return "Invalid Token";
    }

}
