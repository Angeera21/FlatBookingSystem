package com.app.authenticationService.app.authentication.Service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/*
HandlerInterceptor -> gateway for entire app.both request and response will track via this class.
preHandle->
        before goes to controller.
        if return value is true->it will go the controller
        if return values is false it will stop the request.

posthandle->before sends the response to client
aftercompletion->after sends the response to the client
 */

@Configuration
public class TokenInterceptor implements HandlerInterceptor {

    
    private static final Logger logger = LogManager.getLogger(TokenInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("this is prehandle");
        String url = request.getRequestURI();//current rquest url
        System.out.println(url);
        if(url.contains("/login") || url.contains("/register")|| url.contains("html")|| url.contains("web")){
            System.out.println("exclude the url "+url);
            return true;
        }else{
            try{
                String token = request.getHeader("token");//need to pass from the api request.
                String user_id = request.getHeader("user_id");//need to pass from the api request.
                System.out.println("toekn "+token);
                System.out.println("user_id "+user_id);

                if(token == null || token.equals("")){
                   return true;
                    //throw new Exception("token is empty");

                }
                if(user_id == null || user_id.equals("")){
                    throw new Exception("token is empty");
                }
               
                return true;
            }catch (Exception e){
                logger.error(e);
//                e.printStackTrace();
//                response.setStatus(400);//error status code
//                response.getWriter().append("token error "+e.getMessage());//
                throw new Exception(e.getMessage());//
            }
        }


    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("this is posthandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("this is afterCompletion");
    }
}
