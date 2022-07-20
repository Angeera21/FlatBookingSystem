package com.flatService.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flatService.Model.FlatModel;
import com.flatService.Request.FlatRequest;
import com.flatService.Response.GeneralResponse;
import com.flatService.Service.FlatService;



@RestController
@RequestMapping("flat")
public class FlatBooking {
	@Autowired
	Environment env;
	@Autowired
    FlatService flatService;

    @PostMapping("create")
    public ResponseEntity<?> createFlat(@RequestBody  FlatRequest flatRequest){
        try{
            flatService.createFlat(flatRequest);
            return ResponseEntity.ok(new GeneralResponse("created."));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error "+e.getMessage()));
        }
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteFlat(@PathVariable Long id){
        try{
            flatService.flatDelete(id);
            return ResponseEntity.ok(new GeneralResponse("created."));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error"));
        }
    }
    @PostMapping("edit")
    public ResponseEntity<?> editFlat(@RequestBody  FlatRequest flatRequest){
        try{
        	if(flatRequest.getId() == null || flatRequest.getId() <= 0) {
        		throw new Exception("Flat Id is not null");
        	}
            flatService.createFlat(flatRequest);
            return ResponseEntity.ok(new GeneralResponse("created."));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error "+e.getMessage()));
        }
    }
    
    @PostMapping("search")
    public ResponseEntity<?> searchFlat(@RequestBody FlatRequest flatRequest){
        try{
            List<FlatModel> res = flatService.searchFlat(flatRequest);
            return ResponseEntity.ok(res);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error"));
        }
    }
    @PostMapping("imgUpload")
    public ResponseEntity<?> imgUpload(@RequestParam MultipartFile file){
        try{
        	
        	  byte[] bytes = file.getBytes();
        	  long timeStamp = System.currentTimeMillis();
        	  String fileName = timeStamp+file.getOriginalFilename();
              Path path = Paths.get(env.getProperty("filePath") + fileName);
              Files.write(path, bytes);
//            List<FlatModel> res = flatService.searchFlat(flatRequest);
            return ResponseEntity.ok(new GeneralResponse(fileName));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error"));
        }
    }
    @GetMapping("imgRead/{imgName}")
    public @ResponseBody byte[] imgRead(@PathVariable String imgName){
        try{
        	InputStream in = null;
        	String path  = env.getProperty("filePath")+imgName;
        	if(new File(path).exists()) {
        		 in = new FileInputStream(path);
        	}else {
        		in = new FileInputStream(env.getProperty("filePath")+"no.jpg");	
        	} 
        	return IOUtils.toByteArray(in);
        }catch (Exception e){
        	e.printStackTrace();
            return null;
        }
    }
    
    @GetMapping("getall")
    public ResponseEntity<?> getAllFlat(){
        try{
            List<FlatModel> res = flatService.getAll();
            return ResponseEntity.ok(res);
        }catch (Exception e){
        	e.printStackTrace();
            return ResponseEntity.badRequest().body(new GeneralResponse("Error"));
        }
    }
    
    
    @PostMapping("approveOrReject")
    public ResponseEntity<?> approveOrReject(@RequestBody FlatRequest flatRequest){
        try{
            flatService.approveFlat(flatRequest);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error"));
        }
    }
    @GetMapping("getAllBooking")
    public ResponseEntity<?> getAllBooking(){
        try{
            return ResponseEntity.ok(flatService.getAllBooking());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse("Error "+e.getMessage()));
        }
    } 
    @PostMapping("booking")
    public ResponseEntity<?> userBooking(@RequestBody FlatRequest flatReq){
        //call authentication service for validation with email and password
        try{
		 	System.out.println("User id s "+flatReq.getUserId()); 
        	flatService.bookingModel(flatReq);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));

        }
    }
    @DeleteMapping("booking/delete/{id}")
    public ResponseEntity<?> deleteBookingById(@PathVariable Long id){
        //call authentication service for validation with email and password
        try{
        	flatService.deletebookingById(id);
            return ResponseEntity.ok(new GeneralResponse("ok"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new GeneralResponse(e.getMessage()));
        }
    }
}
