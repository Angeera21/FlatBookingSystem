package com.flatService.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flatService.Model.BookingModel;

public interface BookingRepo extends JpaRepository<BookingModel, Long> {

}
