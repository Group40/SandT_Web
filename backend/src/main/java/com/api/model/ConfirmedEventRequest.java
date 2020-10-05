package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.ToString;

@ToString

@Document(collection = "ConfirmedEventRequest")
public class ConfirmedEventRequest {
	private String id;
	private String eventId;
	private String eventName;
	private String eventDate;
	private String name;
	private String number;
	private String email;
	private String heads;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEventId() {
		return eventId;
	}
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHeads() {
		return heads;
	}
	public void setHeads(String heads) {
		this.heads = heads;
	}
}
