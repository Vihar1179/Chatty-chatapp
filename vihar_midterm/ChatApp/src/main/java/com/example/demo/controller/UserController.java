package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/user")
	public List<User> getAllUsers(){
		List<User> userList = userService.getAllUsers();
		return userList;
	}
	
	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable("id") Long userid){
		User user = userService.getUserById(userid);
		return user;
	}
	

	@PostMapping("/users")
	public String createUser(@RequestBody User user) {
		userService.addUser(user);
		return "User is Added !!";
	}
	
	@PutMapping("/users/{id}")
	public String updateUser(@PathVariable("id") Long userid,@RequestBody User user) {
		userService.updateUser(userid, user);
		return "User is Updated !!";	
	}
	
	@DeleteMapping("/userss/{id}")
	public String deleteUser(@PathVariable("id")  Long userid) {
		userService.deleteUser(userid);
		return "User is Deleted !!";
	}
	
}