package com.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.api.model.ConfirmedEventRequest;

@Service
public class NotificationService {
	private JavaMailSender javaMailSender;
	
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}
	
	public void sendNotification(ConfirmedEventRequest user) throws MailException {
		//send email
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(user.getEmail());
		mail.setFrom("ucsctester42@gmail.com");
		mail.setSubject("S & T Group Event selection");
		mail.setText("We are happy to say that you have been selected for the event");
		
		javaMailSender.send(mail);
	}
}
