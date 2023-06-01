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

import com.example.demo.entity.Message;
import com.example.demo.service.MessageService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v2")
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@GetMapping("/msg")
	public List<Message> getAllMessages(){
		List<Message> messageList = messageService.getAllMessages();
		return messageList;
	}
	
	@GetMapping("/msg/{id}")
	public Message getMessageById(@PathVariable("id") Long msgid){
		Message message = messageService.getMessageById(msgid);
		return message;
	}
	

	@PostMapping("/msgs")
	public String createMessage(@RequestBody Message message) {
		messageService.addMessage(message);
		return "Message is Added !!";
	}
	
	@PutMapping("/msgs/{id}")
	public String updateMessage(@PathVariable("id") Long msgid,@RequestBody Message message) {
		messageService.updateMessage(msgid, message);
		return "Message is Updated !!";	
	}
	
	@DeleteMapping("/msgs/{id}")
	public String deleteMessage(@PathVariable("id")  Long msgid) {
		messageService.deleteMessage(msgid);
		return "Message is Deleted !!";
	}
	
}