package com.example.demo.controller;


import com.example.demo.dto.AdminDashboardResponse;
import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.entity.Viewing;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ViewingRepository;
import com.example.demo.dto.ListingModerationStats;
import com.example.demo.dto.AgentStats;

import com.example.demo.dto.CustomerManagementResponse;
import com.example.demo.dto.CustomerStatsResponse;



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
            return propertyRepository.findByListingStatus("PENDING_REVIEW");
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

    property.setListingStatus("APPROVED");

    return propertyRepository.save(property);
}
   @PutMapping("/properties/{id}/reject")
public Property rejectProperty(
        @PathVariable Long id
) {

    Property property =
            propertyRepository.findById(id)
                    .orElseThrow();

    property.setListingStatus("REJECTED");

    return propertyRepository.save(property);
}
@GetMapping("/listing-stats")
public ListingModerationStats getListingStats() {

    return new ListingModerationStats(
            propertyRepository.count(),
            propertyRepository.countByListingStatus("PENDING_REVIEW"),
            propertyRepository.countByListingStatus("APPROVED"),
            propertyRepository.countByListingStatus("REJECTED")
    );
}
@PutMapping("/agents/{id}/verify")
public User verifyAgent(
        @PathVariable Long id
) {

    User user =
            userRepository.findById(id)
                    .orElseThrow();

    user.setStatus("VERIFIED");

    return userRepository.save(user);
}
@PutMapping("/agents/{id}/suspend")
public User suspendAgent(
        @PathVariable Long id
) {

    User user =
            userRepository.findById(id)
                    .orElseThrow();

    user.setStatus("SUSPENDED");

    return userRepository.save(user);
}
@GetMapping("/agent-stats")
public AgentStats getAgentStats() {

    return new AgentStats(
        userRepository.countByRole("AGENT"),
        userRepository.countByRoleAndStatus(
                "AGENT",
                "VERIFIED"
        ),
        userRepository.countByRoleAndStatus(
                "AGENT",
                "PENDING"
        ),
        userRepository.countByRoleAndStatus(
                "AGENT",
                "SUSPENDED"
        )
    );
}
@GetMapping("/customers")
public List<CustomerManagementResponse> getCustomers() {

    return userRepository.findAll()
            .stream()
            .filter(user ->
                    "CUSTOMER".equalsIgnoreCase(
                            user.getRole()
                    ))
            .map(user ->
                    new CustomerManagementResponse(
                            user.getUserId(),
                            user.getFullName(),
                            user.getEmail(),
                            user.getPhone(),
                            user.getStatus()
                    )
            )
            .toList();
}
@GetMapping("/customers/stats")
public CustomerStatsResponse getCustomerStats() {

    long total =
            userRepository.countByRole(
                    "CUSTOMER"
            );

    long active =
            userRepository.countByRoleAndStatus(
                    "CUSTOMER",
                    "ACTIVE"
            );

    long suspended =
            userRepository.countByRoleAndStatus(
                    "CUSTOMER",
                    "SUSPENDED"
            );

    return new CustomerStatsResponse(
            total,
            active,
            suspended
    );
}
@PutMapping("/customers/{id}/suspend")
public String suspendCustomer(
        @PathVariable Long id
) {

    User customer =
            userRepository.findById(id)
                    .orElse(null);

    if(customer == null){
        return "Customer not found";
    }

    customer.setStatus("SUSPENDED");

    userRepository.save(customer);

    return "Customer suspended";
}
@PutMapping("/customers/{id}/activate")
public String activateCustomer(
        @PathVariable Long id
) {

    User customer =
            userRepository.findById(id)
                    .orElse(null);

    if(customer == null){
        return "Customer not found";
    }

    customer.setStatus("ACTIVE");

    userRepository.save(customer);

    return "Customer activated";
}

}