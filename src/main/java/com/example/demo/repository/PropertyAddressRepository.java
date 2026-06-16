package com.example.demo.repository;

import com.example.demo.entity.PropertyAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyAddressRepository
        extends JpaRepository<PropertyAddress, Long> {
                PropertyAddress findByPropertyId(Long propertyId);
}