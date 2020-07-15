package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

@Document(collection = "EventRequest")
public class EventRequest {
	private String id;
	private String eventId;
	private String eventName;
	private String eventDate;
	private String name;
	private String number;
	private String email;
	private String heads;
}
