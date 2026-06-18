package com.example.demo.service;

import com.example.demo.entity.ShortlistedProperty;
import com.example.demo.entity.Property;

import java.util.List;

public interface ShortlistedPropertyService {

    ShortlistedProperty addToShortlist(
            ShortlistedProperty shortlistedProperty);

    List<ShortlistedProperty> getShortlistedProperties(
            Long customerId);

    List<Property> getShortlistedPropertyDetails(
            Long customerId);

    void removeFromShortlist(
        Long customerId,
        Long propertyId);
    
}