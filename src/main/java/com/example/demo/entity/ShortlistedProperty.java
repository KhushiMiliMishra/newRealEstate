package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shortlisted_properties")
public class ShortlistedProperty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shortlist_id")
    private Long shortlistId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "property_id")
    private Long propertyId;

    public ShortlistedProperty() {
    }

    public Long getShortlistId() {
        return shortlistId;
    }

    public void setShortlistId(Long shortlistId) {
        this.shortlistId = shortlistId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }
}