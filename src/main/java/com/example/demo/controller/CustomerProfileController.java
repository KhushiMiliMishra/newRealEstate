package com.example.demo.controller;

import com.example.demo.dto.CustomerProfileResponse;
import com.example.demo.entity.CustomerProfile;
import com.example.demo.repository.CustomerProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerProfileController {

    @Autowired
    private CustomerProfileRepository customerProfileRepository;

    @GetMapping("/{customerId}")
    public CustomerProfileResponse getProfile(
            @PathVariable Long customerId
    ) {

        CustomerProfile profile =
                customerProfileRepository
                        .findById(customerId)
                        .orElse(null);

        if (profile == null) {
            return null;
        }

        return new CustomerProfileResponse(
                profile.getBudgetMin(),
                profile.getBudgetMax(),
                profile.getPreferredLocality(),
                profile.getPreferredPropertyType(),
                profile.getTransactionType()
        );
    }
}