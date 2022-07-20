package com.flatService.Model;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="flat")
public class FlatModel {
    @Id
    @GeneratedValue
    private Long id;
    //@OneToOne
    //@JoinColumn(name = "flat_id", referencedColumnName = "id")
    @OneToOne(fetch =FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name ="id",referencedColumnName = "flat_id")
    private BookingModel bookModel;
    String ownername;
    Integer sqft;
    Long owner_id;
    Long rent;
    String address;
    String pincode;
    Integer isApproved;
    String imgName;
    Integer bhk;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnername() {
        return ownername;
    }

    public void setOwnername(String ownername) {
        this.ownername = ownername;
    }

    public Integer getSqft() {
        return sqft;
    }

    public void setSqft(Integer sqft) {
        this.sqft = sqft;
    }

    public Long getRent() {
        return rent;
    }

    public void setRent(Long rent) {
        this.rent = rent;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Integer getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Integer isApproved) {
        this.isApproved = isApproved;
    }

  

	public Integer getBhk() {
		return bhk;
	}

	public void setBhk(Integer bhk) {
		this.bhk = bhk;
	}

	public BookingModel getBookModel() {
		return bookModel;
	}

	public void setBookModel(BookingModel bookModel) {
		this.bookModel = bookModel;
	}

	public Long getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(Long owner_id) {
		this.owner_id = owner_id;
	}

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
}
