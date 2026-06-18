package com.example.demo.service;

import com.example.demo.entity.ShortlistedProperty;
import com.example.demo.repository.ShortlistedPropertyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Property;
import com.example.demo.repository.PropertyRepository;

import java.util.List;

@Service
public class ShortlistedPropertyServiceImpl
        implements ShortlistedPropertyService {

    @Autowired
    private ShortlistedPropertyRepository repository;
    @Autowired
    private PropertyRepository propertyRepository;
    

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
public List<Property> getShortlistedPropertyDetails(
        Long customerId) {

    List<Long> propertyIds =
            repository.findByCustomerId(customerId)
                    .stream()
                    .map(ShortlistedProperty::getPropertyId)
                    .toList();

    return propertyRepository.findAllById(propertyIds);
}

@Override
public void removeFromShortlist(
        Long customerId,
        Long propertyId) {

    System.out.println("BEFORE DELETE");

    repository.deleteByCustomerIdAndPropertyId(
            customerId,
            propertyId);

    System.out.println("AFTER DELETE");
}
}