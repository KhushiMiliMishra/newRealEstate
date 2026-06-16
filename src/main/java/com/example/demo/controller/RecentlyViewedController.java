package com.example.demo.controller;

import com.example.demo.entity.RecentlyViewed;
import com.example.demo.service.RecentlyViewedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recently-viewed")
@CrossOrigin(origins = "*")
public class RecentlyViewedController {

    @Autowired
    private RecentlyViewedService service;

    @PostMapping
    public RecentlyViewed saveView(
            @RequestBody RecentlyViewed recentlyViewed) {

        return service.saveView(recentlyViewed);
    }

    @GetMapping("/{customerId}")
    public List<RecentlyViewed> getCustomerViews(
            @PathVariable Long customerId) {

        return service.getCustomerViews(customerId);
    }
}