package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
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
}
