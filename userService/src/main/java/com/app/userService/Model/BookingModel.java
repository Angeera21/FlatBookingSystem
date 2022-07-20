package com.app.userService.Model;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
public class BookingModel {

	@Id
    @GeneratedValue
    Long id;
	Long flat_id;
	Long user_id;
	LocalDate booking_date;
//	@OneToOne(mappedBy = "flat")
//    private FlatModel flat;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public Long getFlat_id() {
		return flat_id;
	}

	public void setFlat_id(Long flat_id) {
		this.flat_id = flat_id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public LocalDate getBooking_date() {
		return booking_date;
	}

	public void setBooking_date(LocalDate booking_date) {
		this.booking_date = booking_date;
	}



}
