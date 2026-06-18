package com.example.demo.controller;

import com.example.demo.dto.ViewingRequestDto;
import com.example.demo.entity.ViewingRequestEntity;
import com.example.demo.service.ViewingRequestEntityService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viewing-requests")
@CrossOrigin("*")
public class ViewingRequestEntityController {

    private final ViewingRequestEntityService service;

    public ViewingRequestEntityController(
            ViewingRequestEntityService service) {

        this.service = service;
    }

    @PostMapping
    public ViewingRequestEntity createRequest(
            @RequestBody ViewingRequestDto request) {

        return service.createRequest(request);
    }

    @GetMapping
    public List<ViewingRequestEntity> getAllRequests() {

        return service.getAllRequests();
    }
    @GetMapping("/agent/{agentId}")
public List<ViewingRequestEntity>
getRequestsByAgent(
        @PathVariable Long agentId) {

    return service.getRequestsByAgent(
            agentId);
}

    @PutMapping("/{id}/approve")
    public ViewingRequestEntity approveRequest(
            @PathVariable Long id) {

        return service.approveRequest(id);
    }

    @PutMapping("/{id}/reject")
    public ViewingRequestEntity rejectRequest(
            @PathVariable Long id) {

        return service.rejectRequest(id);
    }
    @GetMapping("/customer/{customerId}")
public List<ViewingRequestEntity>
getCustomerRequests(
        @PathVariable Long customerId) {

    return service.getCustomerRequests(
            customerId);
}
}