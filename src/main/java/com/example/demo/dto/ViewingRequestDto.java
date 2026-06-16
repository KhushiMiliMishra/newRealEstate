package com.example.demo.dto;

import lombok.Data;

@Data
public class ViewingRequestDto {

    private Long propertyId;

    private Long customerId;

    private Long agentId;

    private String requestedDate;

    private String requestedTime;

    private String notes;
}