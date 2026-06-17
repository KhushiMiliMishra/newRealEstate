package com.example.demo.entity;

// import java.util.List;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @Column(name = "agent_id")
    private Long agentId;

    private String title;

    private String description;

    @Column(name = "property_type")
    private String propertyType;

    @Column(name = "transaction_type")
    private String transactionType;

    private BigDecimal price;

    private Integer bhk;

    private Integer bathrooms;

    private Integer balconies;

    @Column(name = "area_sqft")
    private Integer areaSqft;

    @Column(name = "floor_no")
    private Integer floorNo;

    @Column(name = "total_floors")
    private Integer totalFloors;

    @Column(name = "furnishing_status")
    private String furnishingStatus;

    @Column(name = "property_age")
    private Integer propertyAge;

    @Column(name = "listing_status")
    private String listingStatus;

    @Column(name = "property_status")
    private String propertyStatus;

    private String status;

    private String address;

    private String city;

    
    @Column(name = "image_1")
    private String image1;

    @Column(name = "image_2")
    private String image2;

    @Column(name = "image_3")
    private String image3;

    @Column(name = "image_4")
    private String image4;

    @Column(name = "image_5")
    private String image5;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "floor_plan_url")
    private String floorPlanUrl;

    @Column(name = "virtual_tour_url")
    private String virtualTourUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}