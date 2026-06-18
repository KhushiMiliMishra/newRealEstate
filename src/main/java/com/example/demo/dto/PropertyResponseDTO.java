package com.example.demo.dto;

import lombok.Data;
import java.util.List;

@Data
public class PropertyResponseDTO {

    private Long propertyId;
    private Long agentId;

    private String title;
    private String description;
    private String propertyType;
    private String transactionType;

    private Object price;

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
    private String status;

    private String address;
    private String city;

    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String image5;

    private String videoUrl;
    private String floorPlanUrl;
    private String virtualTourUrl;

    private List<String> amenities;
}