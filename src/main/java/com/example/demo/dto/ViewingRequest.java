package com.example.demo.dto;

import lombok.Data;

@Data
public class ViewingRequest {

    private Long propertyId;

    private String propertyTitle;

    private String propertyLocation;

    private String propertyPrice;

    private String date;

    private String time;

    private String notes;

    private String agentName;
}