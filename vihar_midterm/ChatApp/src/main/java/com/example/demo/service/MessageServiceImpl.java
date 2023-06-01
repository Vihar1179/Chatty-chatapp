package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Message;
import com.example.demo.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;

	@Override
	public List<Message> getAllMessages() {
		List<Message> messageList = messageRepository.findAll();
		return messageList;
	}
		

	@Override
	public void addMessage(Message message) {
		messageRepository.save(message);
		
	}

	@Override
	public void updateMessage(Long msgid, Message message) {
		Message existingMessage = messageRepository.findById(msgid).orElse(null);
		if(existingMessage != null) {
			existingMessage.setMsgid(message.getMsgid());
			existingMessage.setUserName(message.getUserName());
			existingMessage.setContent(message.getContent());
			messageRepository.save(existingMessage);
		   }
		
	}

	@Override
	public void deleteMessage(Long msgid) {
		messageRepository.deleteById(msgid);
		
	}

	@Override
	public Message getMessageById(Long msgid) {
		Message message = messageRepository.findById(msgid).orElse(null);
		return message;
		
	}
	
	
}
