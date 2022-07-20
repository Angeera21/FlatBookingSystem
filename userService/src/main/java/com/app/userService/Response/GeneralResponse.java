package com.app.userService.Response;


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
