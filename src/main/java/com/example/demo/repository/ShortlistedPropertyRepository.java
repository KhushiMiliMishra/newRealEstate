package com.example.demo.repository;

import com.example.demo.entity.ShortlistedProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShortlistedPropertyRepository
        extends JpaRepository<ShortlistedProperty, Long> {

    List<ShortlistedProperty> findByCustomerId(Long customerId);

    @Transactional
    void deleteByCustomerIdAndPropertyId(
            Long customerId,
            Long propertyId);
}