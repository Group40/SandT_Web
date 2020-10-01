package com.api.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Component
@Document(collection = "Forum")
public class Forum {

    private String id;
    // private String eventId;
    private String title;
    private String date;
    private String startDate;
    private String startTime;
    private String status = "0";

    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    // public String getEventId() {
    //     return eventId;
    // }

    // public void setEventId(String eventId) {
    //     this.eventId = eventId;
    // }

    public void setId(String id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDateTime(String startDate) {
        this.startDate = startDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}