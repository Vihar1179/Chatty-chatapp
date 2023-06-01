package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<User> getAllUsers() {
		List<User> userList = userRepository.findAll();
		return userList;
	}

	@Override
	public void addUser(User user) {
		userRepository.save(user);
		
	}

	@Override
	public void updateUser(Long userid, User user) {
		User existingUser = userRepository.findById(userid).orElse(null);
		if(existingUser != null) {
			existingUser.setUserid(user.getUserid());
			existingUser.setEmailAddress(user.getEmailAddress());
			existingUser.setPassword(user.getPassword());
			existingUser.setUserName(user.getUserName());
			userRepository.save(existingUser);
		   }
		}
		
	@Override
	public void deleteUser(Long userid) {
		userRepository.deleteById(userid);
		
	}

	@Override
	public User getUserById(Long userid) {
		User user = userRepository.findById(userid).orElse(null);
		return user;
	}

}
