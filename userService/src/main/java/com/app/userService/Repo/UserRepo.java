package com.app.userService.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.userService.Model.UserModel;

@Repository
public interface UserRepo extends JpaRepository<UserModel,Long> {
    @Query("select user from UserModel user where email= ?1 and password = ?2 and user_type=?3")
    Optional<UserModel> findByEmailAndPassword(String email,String password,String type);
    @Query("select user from UserModel user where email= ?1")
    Optional<UserModel> findByEmail(String email);
}
