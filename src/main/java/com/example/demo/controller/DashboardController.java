package com.example.demo.controller;

import com.example.demo.dto.AdminDashboardResponse;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ViewingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private ViewingRepository viewingRepository;

    @GetMapping("/admin")
    public AdminDashboardResponse getAdminDashboard() {

        return new AdminDashboardResponse(
                userRepository.count(),
                propertyRepository.count(),
                viewingRepository.count()
        );
    }
}