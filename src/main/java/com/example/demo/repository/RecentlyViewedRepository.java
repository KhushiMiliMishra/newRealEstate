package com.example.demo.repository;

import com.example.demo.entity.RecentlyViewed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentlyViewedRepository
        extends JpaRepository<RecentlyViewed, Long> {

    List<RecentlyViewed> findByCustomerId(Long customerId);
    void deleteByPropertyId(Long propertyId);
}