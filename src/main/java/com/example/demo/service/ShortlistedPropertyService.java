package com.example.demo.service;

import com.example.demo.entity.ShortlistedProperty;

import java.util.List;

public interface ShortlistedPropertyService {

    ShortlistedProperty addToShortlist(
            ShortlistedProperty shortlistedProperty);

    List<ShortlistedProperty> getShortlistedProperties(
            Long customerId);

    void removeFromShortlist(Long shortlistId);
}