package com.example.demo.service;
import java.util.List;

import com.example.demo.entity.GroupId;

public interface GroupService {


	public List<GroupId> getAllGroups();
	public void addGroup(GroupId group);
	public void updateGroup(Long groupid,GroupId group);
	public void deleteGroup(Long groupid);
	public GroupId getGroupIdById(Long groupid);
}
