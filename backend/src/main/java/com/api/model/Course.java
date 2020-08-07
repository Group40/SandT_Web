package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.ToString;

@ToString

@Document(collection = "Course")
public class Course {
    private String id;
    private String name; 
	private String ageGroupMin;
	private String ageGroupMax; 
	private String price;
	private String location;
	private String description;
	private String url;
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
	public String getAgeGroupMin() {
		return ageGroupMin;
	}
	public void setAgeGroupMin(String ageGroupMin) {
		this.ageGroupMin = ageGroupMin;
	}
	public String getAgeGroupMax() {
		return ageGroupMax;
	}
	public void setAgeGroupMax(String ageGroupMax) {
		this.ageGroupMax = ageGroupMax;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
    }
    public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
    }
    public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
    }
    public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}
