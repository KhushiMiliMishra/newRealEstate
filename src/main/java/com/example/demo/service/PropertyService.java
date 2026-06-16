package com.example.demo.service;

import com.example.demo.dto.PropertyRequest;
import com.example.demo.entity.Property;

import java.util.List;

public interface PropertyService {

    Property createProperty(PropertyRequest request);

    List<Property> getPropertiesByAgent(Long agentId);
    List<Property> getAllProperties();
    List<Property> searchProperties(
        String city,
        Integer bhk,
        String propertyType,
        String transactionType
);
List<Property> searchByPriceRange(
        Double minPrice,
        Double maxPrice);

    Property getPropertyById(Long propertyId);
    Property approveProperty(Long propertyId);
    Property rejectProperty(Long propertyId);
    Property updateProperty(Long id, PropertyRequest request);
    void deleteProperty(Long id);
}