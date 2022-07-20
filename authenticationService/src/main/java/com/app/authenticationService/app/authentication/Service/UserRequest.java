package com.app.authenticationService.app.authentication.Service;

public class UserRequest {
	private String email;
    private String password;
    String user_type;
    private  String name;
	    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

 


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
}
