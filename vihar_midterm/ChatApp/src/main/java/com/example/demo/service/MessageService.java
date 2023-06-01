package com.example.demo.service;
import java.util.List;

import com.example.demo.entity.Message;

public interface MessageService {

	public List<Message> getAllMessages();
	public void addMessage(Message message);
	public void updateMessage(Long msgid,Message message);
	public void deleteMessage(Long msgid);
	public Message getMessageById(Long msgid);
}
