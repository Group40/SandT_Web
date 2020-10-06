package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.ToString;

@ToString

@Document(collection = "Notification")
public class Notification {
    private String id;
    private String authorName;
    private String authorType;
    private String authorMail;
    private String name; 
    private String nameType; 
	private String date;
	private String eventDate;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
    }
    public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
    }
    public String getAuthorType() {
		return authorType;
	}
	public void setAuthorType(String authorType) {
		this.authorType = authorType;
    }
    public String getAuthorMail() {
		return authorMail;
	}
	public void setAuthorMail(String authorMail) {
		this.authorMail = authorMail;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
    }
    public String getNameType() {
		return nameType;
	}
	public void setNameType(String nameType) {
		this.nameType = nameType;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
}
