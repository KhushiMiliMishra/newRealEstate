package com.example.demo.controller;

import com.example.demo.dto.PropertyRequest;
import com.example.demo.entity.Property;
import com.example.demo.service.PropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
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
}