package com.example.demo.service;

import com.example.demo.dto.PropertyRequest;
import com.example.demo.entity.Property;

import java.util.List;

public interface PropertyService {

    Property createProperty(PropertyRequest request);

    List<Property> getPropertiesByAgent(Long agentId);
    List<Property> getAllProperties();

    Property getPropertyById(Long propertyId);
}