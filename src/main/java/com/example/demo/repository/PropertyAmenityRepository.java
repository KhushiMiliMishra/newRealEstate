package com.example.demo.repository;

import com.example.demo.entity.PropertyAmenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyAmenityRepository
        extends JpaRepository<PropertyAmenity, Long> {

    List<PropertyAmenity> findByPropertyId(Long propertyId);

    void deleteByPropertyId(Long propertyId);
}