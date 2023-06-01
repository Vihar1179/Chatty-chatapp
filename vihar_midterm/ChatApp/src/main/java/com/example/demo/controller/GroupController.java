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

import com.example.demo.entity.GroupId;
import com.example.demo.service.GroupService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v3")
public class GroupController {

	@Autowired
	private GroupService groupService;
	
	@GetMapping("/grp")
	public List<GroupId> getAllGroups(){
		List<GroupId> groupList = groupService.getAllGroups();
		return groupList;
	}
	
	@GetMapping("/grp/{id}")
	public GroupId getGroupById(@PathVariable("id") Long groupid){
		GroupId group = groupService.getGroupIdById(groupid);
		return group;
	}
	

	@PostMapping("/grps")
	public String createGroup(@RequestBody GroupId group) {
		groupService.addGroup(group);
		return "Group is Added !!";
	}
	
	@PutMapping("/grps/{id}")
	public String updateGroup(@PathVariable("id") Long groupid,@RequestBody GroupId group) {
		groupService.updateGroup(groupid, group);
		return "Group is Updated !!";	
	}
	
	@DeleteMapping("/grps/{id}")
	public String deleteGroup(@PathVariable("id")  Long groupid) {
		groupService.deleteGroup(groupid);
		return "Group is Deleted !!";
	}
	
}