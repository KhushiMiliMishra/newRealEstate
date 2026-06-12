package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "property_address")
public class PropertyAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @Column(name = "property_id")
    private Long propertyId;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String city;

    private String state;

    private String country;

    private String pincode;

    @Column(name = "address_line")
    private String addressLine;

    private String locality;
}