package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Contact;
import com.example.demo.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService{

	@Autowired
	private ContactRepository contactRepository;
	
	@Override
	public List<Contact> getAllContacts() {
		List<Contact> contactList=contactRepository.findAll();
	    return contactList;
	}

	@Override
	public void addContact(Contact contact) {
		contactRepository.save(contact);	
	}

	@Override
	public void updateContact(Long contactid, Contact contact) {
		Contact existingContact = contactRepository.findById(contactid).orElse(null);
		if(existingContact != null) {
			existingContact.setContactid(contact.getContactid());
			existingContact.setContactName(contact.getContactName());			
			contactRepository.save(existingContact);
		   }
		
	}

	@Override
	public void deleteContact(Long contactid) {
		contactRepository.deleteById(contactid);
		
	}

	@Override
	public Contact getContactById(Long contactid) {
		Contact contact = contactRepository.findById(contactid).orElse(null);
		return contact;
	
	}
	
}
