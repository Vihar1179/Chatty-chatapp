package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.GroupId;

public interface GroupRepository extends JpaRepository<GroupId, Long> {
	
	
}
