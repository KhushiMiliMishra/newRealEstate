package com.example.demo.controller;

import com.example.demo.entity.ShortlistedProperty;
import com.example.demo.service.ShortlistedPropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{shortlistId}")
    public String removeFromShortlist(
            @PathVariable Long shortlistId) {

        service.removeFromShortlist(shortlistId);

        return "Removed Successfully";
    }
}