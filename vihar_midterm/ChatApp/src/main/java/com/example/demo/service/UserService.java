package com.example.demo.service;
import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

	public List<User> getAllUsers();
	public void addUser(User user);
	public void updateUser(Long userid,User user);
	public void deleteUser(Long userid);
	public User getUserById(Long userid);
}
