package com.AdminService.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequestMapping("admin")
@RestController
public class AdminController {

	@Autowired
	RestTemplate rest;
    
    @DeleteMapping("userDelete")
    public ResponseEntity<?> userDelete(@PathVariable Long id){
        try{
        	String url = "http://localhost:8082/user/deleteUserById/"+id;
        	ResponseEntity<String> response
        	  = rest.getForEntity(url, String.class);
		if(response.getStatusCode() == HttpStatus.OK) {
        		return ResponseEntity.ok(new GeneralResponse("ok"));			
		}else {
			throw new Exception("Error");
		}
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error "+e.getMessage()));
        }
    }
}
