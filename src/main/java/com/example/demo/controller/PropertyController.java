package com.example.demo.controller;

import com.example.demo.dto.PropertyRequest;
import com.example.demo.entity.Property;
import com.example.demo.service.PropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping
    public Property createProperty(
            @RequestBody PropertyRequest request) {

        return propertyService.createProperty(request);
    }

    @GetMapping("/agent/{agentId}")
    public List<Property> getPropertiesByAgent(
            @PathVariable Long agentId) {

        return propertyService.getPropertiesByAgent(agentId);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // SEARCH API
@GetMapping("/search")
public List<Property> searchProperties(

        @RequestParam(required = false) String city,

        @RequestParam(required = false) Integer bhk,

        @RequestParam(required = false) String propertyType,

        @RequestParam(required = false) String transactionType) {

    return propertyService.searchProperties(
            city,
            bhk,
            propertyType,
            transactionType);
}


    @GetMapping("/{id}")
    public Property getPropertyById(
            @PathVariable Long id) {

        return propertyService.getPropertyById(id);
    }

    @PutMapping("/{id}/approve")
    public Property approveProperty(
            @PathVariable Long id) {

        return propertyService.approveProperty(id);
    }

    @PutMapping("/{id}/reject")
    public Property rejectProperty(
            @PathVariable Long id) {

        return propertyService.rejectProperty(id);
    }

    @PutMapping("/{id}")
    public Property updateProperty(
            @PathVariable Long id,
            @RequestBody PropertyRequest request) {

        return propertyService.updateProperty(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(
            @PathVariable Long id) {

        propertyService.deleteProperty(id);

        return "Property Deleted Successfully";
    }
    @GetMapping("/search/price")
public List<Property> searchByPrice(
        @RequestParam Double minPrice,
        @RequestParam Double maxPrice) {

    return propertyService.searchByPriceRange(
            minPrice,
            maxPrice);
}
}