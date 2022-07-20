package com.flatService.Request;

public class FlatRequest {
    Integer sqft,bhk;
    Long rent;
    Integer isApprove;
    String ownerName;
    String address;
    String pincode;
    String searchType;
    String searchValue;
    Long userId;
    Long owernerId;
    String imgName;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    Long id;


    public Integer getIsApprove() {
        return isApprove;
    }

    public void setIsApprove(Integer isApprove) {
        this.isApprove = isApprove;
    }

   
    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getSearchVal() {
        return SearchVal;
    }

    public void setSearchVal(String searchVal) {
        SearchVal = searchVal;
    }

    String SearchVal;

    public Long getRent() {
        return rent;
    }

    public void setRent(Long rent) {
        this.rent = rent;
    }


    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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




    public Integer getSqft() {
        return sqft;
    }

    public void setSqft(Integer sqft) {
        this.sqft = sqft;
    }

    public Integer getBhk() {
        return bhk;
    }

    public void setBhk(Integer bhk) {
        this.bhk = bhk;
    }

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getSearchValue() {
		return searchValue;
	}
	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}
	public Long getOwernerId() {
		return owernerId;
	}
	public void setOwernerId(Long owernerId) {
		this.owernerId = owernerId;
	}
	public String getImgName() {
		return imgName;
	}
	public void setImgName(String imgName) {
		this.imgName = imgName;
	}



}
