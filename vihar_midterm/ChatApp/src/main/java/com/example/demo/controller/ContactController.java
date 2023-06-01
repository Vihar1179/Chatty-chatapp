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

import com.example.demo.entity.Contact;
import com.example.demo.service.ContactService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v4")
public class ContactController {

	@Autowired
	private ContactService contactService;
	
	@GetMapping("/cont")
	public List<Contact> getAllContacts(){
		List<Contact> contactList = contactService.getAllContacts();
		return contactList;
	}
	
	@GetMapping("/cont/{id}")
	public Contact getContactById(@PathVariable("id") Long contactid){
		Contact contact = contactService.getContactById(contactid);
		return contact;
	}
	

	@PostMapping("/cont")
	public String createContact(@RequestBody Contact contact) {
		contactService.addContact(contact);
		return "Contact is Added !!";
	}
	
	@PutMapping("/cont/{id}")
	public String updateContact(@PathVariable("id") Long contactid,@RequestBody Contact contact) {
		contactService.updateContact(contactid, contact);
		return "Contact is Updated !!";	
	}
	
	@DeleteMapping("/cont/{id}")
	public String deleteContact(@PathVariable("id")  Long contactid) {
		contactService.deleteContact(contactid);
		return "Contact is Deleted !!";
	}
	
}