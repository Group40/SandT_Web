package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.ToString;

@ToString

@Document(collection = "Event")
public class Event {
	private String id;
	private String name; 
	private String date;
	private String venue;
	private String description;
	private String headCount;
	private String available;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getHeadCount() {
		return headCount;
	}
	public void setHeadCount(String headCount) {
		this.headCount = headCount;
	}
	public String getAvailable() {
		return available;
	}
	public void setAvailable(String available) {
		this.available = available;
	}
}
