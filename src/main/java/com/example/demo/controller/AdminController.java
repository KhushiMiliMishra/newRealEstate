package com.example.demo.controller;

import com.example.demo.dto.AdminDashboardResponse;
import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.entity.Viewing;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ViewingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private ViewingRepository viewingRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {

    return new AdminDashboardResponse(
            userRepository.count(),
            propertyRepository.count(),
            viewingRepository.count()
    );
}
    @GetMapping("/pending-properties")
    public List<Property> getPendingProperties() {
        return propertyRepository.findByPropertyStatus("PENDING");
    }
    @GetMapping("/viewings")
    public List<Viewing> getAllViewings() {
        return viewingRepository.findAll();
    }

    @PutMapping("/properties/{id}/approve")
public Property approveProperty(
        @PathVariable Long id
) {

    Property property =
            propertyRepository.findById(id)
                    .orElseThrow();

    property.setPropertyStatus("APPROVED");

    return propertyRepository.save(property);
}

    @PutMapping("/properties/{id}/reject")
    public Property rejectProperty(
            @PathVariable Long id
    ) {

        Property property =
                propertyRepository.findById(id)
                        .orElseThrow();

        property.setPropertyStatus("REJECTED");

        return propertyRepository.save(property);
    }
}