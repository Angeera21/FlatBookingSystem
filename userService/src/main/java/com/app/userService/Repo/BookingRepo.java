package com.app.userService.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.userService.Model.BookingModel;

public interface BookingRepo extends JpaRepository<BookingModel, Long> {

}
