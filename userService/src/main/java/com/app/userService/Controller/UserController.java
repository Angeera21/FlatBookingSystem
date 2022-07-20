package com.app.userService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.userService.Config.JwtTokenUtil;
import com.app.userService.Model.UserModel;
import com.app.userService.Request.UserRequest;
import com.app.userService.Response.GeneralResponse;
import com.app.userService.Service.UserService;
@RequestMapping("user")
@RestController
public class UserController {

	@Autowired
	JwtTokenUtil jwtToken;
	@Autowired
	Environment env;
    @Autowired
    UserService userService;
    
//    @Autowired
//    FlatService flatService;

    @PostMapping("login")
    public ResponseEntity<?> userLogin(@RequestBody UserRequest userReq){
        //call authentication service for validation with email and password
        try{
        	String token = jwtToken.generateToken(userReq.getEmail());
        	System.out.println(token);
        	UserModel model = userService.userLogin(userReq);
        	model.setUserToken(token);
            return ResponseEntity.ok(model);//200 status code
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));//400 status

        }    }
    @GetMapping("get")
    public ResponseEntity<?> getAllUsers(){
        //call authentication service for validation with email and password
        try{
            List<UserModel> res = userService.getAllUsers();
            return ResponseEntity.ok(res);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
    }
    @PostMapping("register")
    public ResponseEntity<?> userRegister(@RequestBody UserRequest userReq){
        //call authentication service for validation with email and password
        try{
            userService.userOrAdminRegister(userReq);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
        
    }
    @PostMapping("updateUserById")
    public ResponseEntity<?> updateUserById(@RequestBody UserRequest userReq){
        //call authentication service for validation with email and password
        try{
            userService.updateUserById(userReq);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
        //
    }
    
    @PostMapping("updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UserRequest userReq){
        //call authentication service for validation with email and password
        try{
            userService.updatePassword(userReq);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
    }
    
    @DeleteMapping("deleteUserById/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id){
        //call authentication service for validation with email and password
        try{
            userService.deleteUserById(id);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
        //
    }
    
    //
    
    
}

