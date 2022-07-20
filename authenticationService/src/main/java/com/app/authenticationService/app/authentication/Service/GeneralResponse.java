package com.app.authenticationService.app.authentication.Service;


public class GeneralResponse {

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    String message;

    public GeneralResponse(String message){
        this.message = message;
    }
}
