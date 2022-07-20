package com.flatService.Service;

import  java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.flatService.Model.BookingModel;
import com.flatService.Model.FlatModel;
import com.flatService.Repo.BookingRepo;
import com.flatService.Repo.FlatRepo;
import com.flatService.Request.FlatRequest;

@Service
public class FlatService{
    @Autowired
    FlatRepo flatRepo;
    @Autowired
    BookingRepo bookingRepo;

  
    public void bookingModel(FlatRequest flat)throws  Exception{
    	try {
		 	FlatModel flatObj = flatRepo.findById(flat.getId()).orElseThrow(()->new Exception("No Flat found"));;
	        
		 	BookingModel bModel =new BookingModel();
		 	System.out.println("User id s "+flat.getUserId()); 
	        bModel.setUser_id(flat.getUserId());
	        bModel.setFlat_id(flatObj.getId());
	        //bModel.setBooking_date(new LocalDate());
	        bookingRepo.save(bModel);
    	}catch(Exception e) {
    		throw e;
    	}
       
        
    }
    public void flatDelete(Long id)throws Exception  {
    	try {
		 	FlatModel flatObj = flatRepo.findById(id).orElseThrow(()->new Exception("No Flat found"));;
	        flatRepo.delete(flatObj);
    	}  catch(Exception e) {
    		throw e;
    	}
    }
    public FlatModel getFlatById(Long id)throws Exception  {
    	try {
		 	FlatModel flatObj = flatRepo.findById(id).orElseThrow(()->new Exception("No Flat found"));;
	 		return flatObj;
		}  catch(Exception e) {
    		throw e;
    	}
    }
    public void deleteBooking() {
    	//bookingRepo.deleteAll();
    }
    
    public void createFlat(FlatRequest req)throws Exception{
    	try {
    		 	FlatModel flatModel = new FlatModel();
    	        if(!ObjectUtils.isEmpty(req.getId())) {
    	        	System.out.println("exist flat");
    	        	flatModel = getFlatById(req.getId());
    	        }else {
    	        	System.out.println("new flat");
    	        	flatModel.setIsApproved(1);    	        
	    	        flatModel.setOwner_id(req.getOwernerId());
    	        }
    	       if(!ObjectUtils.isEmpty(req.getAddress())){
    	    	   flatModel.setAddress(req.getAddress());
    	        }
    	       if(!ObjectUtils.isEmpty(req.getImgName())){
    	    	   flatModel.setImgName(req.getImgName());
    	        }
    	       if(!ObjectUtils.isEmpty(req.getPincode())){
    	    	   flatModel.setPincode(req.getPincode());
    	        }
    	       if(!ObjectUtils.isEmpty(req.getSqft())){
	       	        flatModel.setSqft(req.getSqft());
	   	        }
	    	     if(!ObjectUtils.isEmpty(req.getRent())){
	       	        flatModel.setRent(req.getRent());
	   	        }
	    	     if(!ObjectUtils.isEmpty(req.getBhk())){
	       	        flatModel.setBhk(req.getBhk());
	   	        }
    	      //  
    	       // 
    	        flatRepo.save(flatModel);
    	}catch(Exception e) {
    		throw e;
    	}
       
    }

    public List<FlatModel> searchFlat(FlatRequest req){
    	List<FlatModel> list = null;
    	 if(req.getSearchType().equals("bhk")) {
    		 list = flatRepo.getFlatBhk(req.getBhk());
    	}else if(req.getSearchType().equals("rent")) {
    		list = flatRepo.getFlatByRent(req.getRent());
    	}else if(req.getSearchType().equals("pincode")) {
    		list =  flatRepo.getFlatPincode(req.getPincode());
    	}    
    	 list = flatRepo.findAll();	
         return addBookingWithFlats(list);
    }
    public List<FlatModel> addBookingWithFlats(List<FlatModel> list) {  
    	List<BookingModel> bModel = bookingRepo.findAll();
    	list.forEach((o)->{
        		o.setBookModel(bModel.stream().filter(ob->ob.getFlat_id()==o.getId()).findFirst().orElse(null));
        });;
        return list;
    }
    
    public List<FlatModel> getAll(){
    	List<FlatModel> list = flatRepo.findAll();
//    	list.forEach((o)->{
//        		o.setBookModel(bModel.stream().filter(ob->ob.getFlat_id()==o.getId()).findFirst().orElse(null));
//        });;
        return addBookingWithFlats(list);
    }
    public List<BookingModel> getAllBooking(){
        return bookingRepo.findAll();
    }
    public void deletebookingById(Long id){
         bookingRepo.deleteById(id);
    }
    public void approveFlat(FlatRequest req) throws Exception{
        FlatModel flatModel = flatRepo.findById(req.getId()).orElseThrow(()->new Exception("No Flat Found"));
        flatModel.setIsApproved(req.getIsApprove());
        flatRepo.save(flatModel);
    }
}
