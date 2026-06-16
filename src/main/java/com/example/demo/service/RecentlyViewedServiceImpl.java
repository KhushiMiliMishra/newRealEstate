package com.example.demo.service;

import com.example.demo.entity.RecentlyViewed;
import com.example.demo.repository.RecentlyViewedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecentlyViewedServiceImpl
        implements RecentlyViewedService {

    @Autowired
    private RecentlyViewedRepository repository;

    @Override
    public RecentlyViewed saveView(
            RecentlyViewed recentlyViewed) {

        return repository.save(recentlyViewed);
    }

    @Override
    public List<RecentlyViewed> getCustomerViews(
            Long customerId) {

        return repository.findByCustomerId(customerId);
    }
}