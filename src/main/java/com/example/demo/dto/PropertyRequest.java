package com.example.demo.dto;

import java.util.List;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyRequest {

    private Long agentId;

    private String title;
    private String description;

    private String propertyType;
    private String transactionType;

    private BigDecimal price;

    private Integer bhk;
    private Integer bathrooms;
    private Integer balconies;
    private Integer areaSqft;

    private Integer floorNo;
    private Integer totalFloors;

    private String furnishingStatus;
    private Integer propertyAge;

    private String listingStatus;
    private String propertyStatus;

    private String addressLine;
    private String locality;

    private String city;
    private String state;
    private String country;
    private String pincode;

    private BigDecimal latitude;
    private BigDecimal longitude;

    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String image5;

    private String videoUrl;
    private String floorPlanUrl;
    private String virtualTourUrl;
}