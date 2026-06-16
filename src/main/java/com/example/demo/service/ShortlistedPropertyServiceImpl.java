package com.example.demo.service;

import com.example.demo.entity.ShortlistedProperty;
import com.example.demo.repository.ShortlistedPropertyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShortlistedPropertyServiceImpl
        implements ShortlistedPropertyService {

    @Autowired
    private ShortlistedPropertyRepository repository;

    @Override
    public ShortlistedProperty addToShortlist(
            ShortlistedProperty shortlistedProperty) {

        return repository.save(shortlistedProperty);
    }

    @Override
    public List<ShortlistedProperty> getShortlistedProperties(
            Long customerId) {

        return repository.findByCustomerId(customerId);
    }

    @Override
    public void removeFromShortlist(Long shortlistId) {

        repository.deleteById(shortlistId);
    }
}