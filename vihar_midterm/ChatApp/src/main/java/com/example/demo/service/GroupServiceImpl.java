package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.GroupId;
import com.example.demo.repository.GroupRepository;


@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepository;
	
	@Override
	public List<GroupId> getAllGroups() {
			List<GroupId> groupList = groupRepository.findAll();
			return groupList;
	}

	@Override
	public void addGroup(GroupId group) {
		groupRepository.save(group);	
	}

	@Override
	public void updateGroup(Long groupid, GroupId group) {
		GroupId existingGroup = groupRepository.findById(groupid).orElse(null);
		if(existingGroup != null) {
			existingGroup.setGroupid(group.getGroupid());
			existingGroup.setGroupName(group.getGroupName());
			existingGroup.setGroupMember(group.getGroupMember());
			groupRepository.save(existingGroup);
		}
		
	}

	@Override
	public void deleteGroup(Long groupid) {
		groupRepository.deleteById(groupid);
		
	}

	@Override
	public GroupId getGroupIdById(Long groupid) {
		GroupId group = groupRepository.findById(groupid).orElse(null);
		return group;
	}

}
