package com.example.demo.repository;

import com.example.demo.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository
        extends JpaRepository<Property, Long> {

    List<Property> findByAgentId(Long agentId);

    List<Property> findByCityIgnoreCase(String city);

    List<Property> findByBhk(Integer bhk);

    List<Property> findByPropertyStatus(String propertyStatus);
    
    List<Property> findByPropertyTypeIgnoreCase(String propertyType);

    List<Property> findByTransactionTypeIgnoreCase(String transactionType);

    List<Property> findByPriceBetween(
            Double minPrice,
            Double maxPrice);

    List<Property> findByCityIgnoreCaseAndBhkAndPropertyTypeIgnoreCaseAndTransactionTypeIgnoreCase(
            String city,
            Integer bhk,
            String propertyType,
            String transactionType);
}