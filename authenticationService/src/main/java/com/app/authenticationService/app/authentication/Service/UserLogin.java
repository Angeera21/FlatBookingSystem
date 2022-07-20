package com.app.authenticationService.app.authentication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("user")
public class UserLogin {
	@Autowired
	RestTemplate rest;
	@PostMapping("login")
    public ResponseEntity<?> userLogin(@RequestBody UserRequest userReq){
        //call authentication service for validation with email and password
        try{
        	 rest.postForEntity("http://localhost:8082", userReq, null);
            return ResponseEntity.ok("");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }    }
}
