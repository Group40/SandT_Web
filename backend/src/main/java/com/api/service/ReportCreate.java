package com.api.service;

import com.api.model.Notification;
import com.api.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportCreate {
    @Autowired
    private NotificationRepository notificationRepository;

    public void notificationCreate(String name,String email,String type,String role){
        Notification notification = new Notification();
        notification.setAuthorName(name);
        notification.setAuthorMail(email);
        notification.setAuthorType(role);
        notification.setNameType(type);
    }
}
