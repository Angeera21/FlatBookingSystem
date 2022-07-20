package com.flatService.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.flatService.Model.FlatModel;

@Repository
public interface FlatRepo extends JpaRepository<FlatModel,Long> {
	@Query("select flat from FlatModel flat where flat.pincode = ?1")
	List<FlatModel> getFlatPincode(String pincode);
	
	@Query("select flat from FlatModel flat where flat.bhk = ?1")
	List<FlatModel> getFlatBhk(Integer bhk);
	
	@Query("select flat from FlatModel flat where flat.rent > ?1")
	List<FlatModel> getFlatByRent(Long rent);

	
	
}
