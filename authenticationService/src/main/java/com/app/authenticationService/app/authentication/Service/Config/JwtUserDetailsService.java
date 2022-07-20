package com.app.authenticationService.app.authentication.Service.Config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;




@Service 
public class JwtUserDetailsService implements UserDetailsService {
	
	
	

	@Override
	public UserDetails loadUserByUsername(String userName) {
		/** fetching user by userName, if user is null the throw exception, otherwise
		 * return user
		 */
		
		
		return null;
		//return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),new ArrayList<>());
	}

}