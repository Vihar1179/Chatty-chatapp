package com.example.demo.service;
import java.util.List;

import com.example.demo.entity.Contact;

public interface ContactService {

	public List<Contact> getAllContacts();
	public void addContact(Contact contact);
	public void updateContact(Long contactid,Contact contact);
	public void deleteContact(Long contactid);
	public Contact getContactById(Long contactid);
		
		
}
