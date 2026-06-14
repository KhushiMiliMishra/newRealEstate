package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "viewings")
public class Viewing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long propertyId;
    private String propertyTitle;
    private String propertyLocation;
    private String propertyPrice;

    private String date;
    private String time;
    private String notes;

    private String agentName;

    private String status;
    public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}