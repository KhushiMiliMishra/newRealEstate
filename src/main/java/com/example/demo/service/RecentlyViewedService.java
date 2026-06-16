package com.example.demo.service;

import com.example.demo.entity.RecentlyViewed;

import java.util.List;

public interface RecentlyViewedService {

    RecentlyViewed saveView(
            RecentlyViewed recentlyViewed);

    List<RecentlyViewed> getCustomerViews(
            Long customerId);
}