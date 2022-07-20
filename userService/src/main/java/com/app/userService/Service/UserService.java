package com.app.userService.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.userService.Model.BookingModel;
import com.app.userService.Model.UserModel;
import com.app.userService.Repo.BookingRepo;
import com.app.userService.Repo.UserRepo;
import com.app.userService.Request.FlatRequest;
import com.app.userService.Request.UserRequest;


@Service
public class UserService {

//	@Autowired
//	FlatRepo flatRepo;
//	
    @Autowired
    UserRepo userRepo;
    

    public UserModel userLogin(UserRequest user)throws  Exception{
    	
    		UserModel userObj = userRepo.findByEmailAndPassword(user.getEmail(),user.getPassword(),user.getUser_type()).orElseThrow(()->new Exception("No User found"));
            return  userObj;	
    	
        
    }
   
    public List<UserModel> getAllUsers(){
       return userRepo.findAll();
    }
    public void deleteUserById(Long id)throws  Exception{
        UserModel user = userRepo.findById(id).orElseThrow(()->new Exception("User is not found"));
        userRepo.delete(user);
    }
    public void updateUserById(UserRequest user)throws  Exception{
    	
        UserModel userModel = userRepo.findById(user.getId()).orElseThrow(()->new Exception("User is not found"));
        Optional<UserModel> exist =  userRepo.findByEmail(user.getEmail());
    	if(exist.isPresent()) {
    		throw new Exception("Email is already registred.");
    	}
        userModel.setEmail(user.getEmail());
        userModel.setName(user.getName());
        
        userRepo.save(userModel);
    }
    
    public void updatePassword(UserRequest user)throws  Exception{
        UserModel userModel = userRepo.findById(user.getId()).orElseThrow(()->new Exception("User is not found"));
        userModel.setPassword(user.getPassword());
        userRepo.save(userModel);
    }

    public void userOrAdminRegister(UserRequest user)throws  Exception{
    	Optional<UserModel> exist =  userRepo.findByEmail(user.getEmail());
    	
    	if(exist.isPresent()) {
    		throw new Exception("Email is already registred.");
    	}
        UserModel userModel = new UserModel();
        userModel.setEmail(user.getEmail());
        userModel.setName(user.getName());
        userModel.setPassword(user.getPassword());
        userModel.setUser_type(user.getUser_type());
        userRepo.save(userModel);
    }
    

}
