package com.example.demo.controller;

import com.example.demo.entity.ShortlistedProperty;
import com.example.demo.service.ShortlistedPropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Property;

import java.util.List;

@RestController
@RequestMapping("/api/shortlist")
@CrossOrigin(origins = "*")
public class ShortlistedPropertyController {

    @Autowired
    private ShortlistedPropertyService service;

    @PostMapping
    public ShortlistedProperty addToShortlist(
            @RequestBody ShortlistedProperty shortlistedProperty) {

        return service.addToShortlist(shortlistedProperty);
    }

    @GetMapping("/{customerId}")
    public List<ShortlistedProperty> getShortlistedProperties(
            @PathVariable Long customerId) {

        return service.getShortlistedProperties(customerId);
    }

    @GetMapping("/properties/{customerId}")
public List<Property> getShortlistedPropertyDetails(
        @PathVariable Long customerId) {

    return service.getShortlistedPropertyDetails(
            customerId);
}

@DeleteMapping("/{customerId}/{propertyId}")
public String removeFromShortlist(
        @PathVariable Long customerId,
        @PathVariable Long propertyId) {

    System.out.println(
        "DELETE REQUEST => customerId="
        + customerId +
        " propertyId="
        + propertyId
    );

    service.removeFromShortlist(
            customerId,
            propertyId);

    return "Removed Successfully";
}
}