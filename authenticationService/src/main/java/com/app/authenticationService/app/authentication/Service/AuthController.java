package com.app.authenticationService.app.authentication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequestMapping("admin")
@RestController
public class AuthController {

	@Autowired
	RestTemplate rest;
    
    @PostMapping("login")
    public ResponseEntity<?> userDelete(@RequestBody UserRequest req){
        try{
        	HttpEntity<UserRequest> request = new HttpEntity<>(req);

        	String url = "http://localhost:8082/user/login/";
        	String response
        	  = rest.postForObject(url, request,String.class);
        	
		if(response != null) {
        		return ResponseEntity.ok(new GeneralResponse("ok"));			
		}else {
			throw new Exception("Error in login");
		}
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error "+e.getMessage()));
        }
    }
}
