package com.example.demo.service;

import com.example.demo.dto.ViewingRequestDto;
import com.example.demo.entity.ViewingRequestEntity;
import com.example.demo.repository.ViewingRequestEntityRepository;
import com.example.demo.entity.CustomerProfile;
import com.example.demo.entity.Property;
import com.example.demo.repository.CustomerProfileRepository;
import com.example.demo.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ViewingRequestEntityServiceImpl implements ViewingRequestEntityService {

    private final ViewingRequestEntityRepository repository;
    private final UserRepository userRepository;
private final PropertyRepository propertyRepository;
    public ViewingRequestEntityServiceImpl(
            ViewingRequestEntityRepository repository,
            UserRepository userRepository,
            PropertyRepository propertyRepository) {

    this.repository = repository;
    this.userRepository = userRepository;
    this.propertyRepository = propertyRepository;
}

    @Override
    public ViewingRequestEntity createRequest(
            ViewingRequestDto request) {

        ViewingRequestEntity entity =
                new ViewingRequestEntity();

        entity.setPropertyId(
                request.getPropertyId());

        entity.setCustomerId(
                request.getCustomerId());

        User user = userRepository
                .findById(request.getCustomerId())
                .orElse(null);

        if (user != null) {
            entity.setCustomerName(
                    user.getFullName());
        }

        Property property = propertyRepository
                .findById(request.getPropertyId())
                .orElse(null);

        if (property != null) {
            entity.setPropertyTitle(
                    property.getTitle());
            entity.setAgentId(
                    property.getAgentId());
        } else {
            entity.setAgentId(
                    request.getAgentId());
        }

        entity.setRequestedDate(
                request.getRequestedDate());

        entity.setRequestedTime(
                request.getRequestedTime());

        entity.setNotes(
                request.getNotes());

        entity.setStatus("PENDING");

        System.out.println(
                "Saving customer name = " +
                entity.getCustomerName()
                );

        return repository.save(entity);
    }

    @Override
    public List<ViewingRequestEntity> getAllRequests() {
        List<ViewingRequestEntity> requests = repository.findAll();
        populateDetails(requests);
        return requests;
    }

    @Override
    public ViewingRequestEntity approveRequest(
            Long id) {

        ViewingRequestEntity request =
                repository.findById(id)
                .orElseThrow();

        request.setStatus("CONFIRMED");

        return repository.save(request);
    }

    @Override
    public ViewingRequestEntity rejectRequest(
            Long id) {

        ViewingRequestEntity request =
                repository.findById(id)
                .orElseThrow();

        request.setStatus("CANCELLED");

        return repository.save(request);
    }

    @Override
    public List<ViewingRequestEntity> getCustomerRequests(Long customerId) {
        List<ViewingRequestEntity> requests = repository.findByCustomerId(customerId);
        populateDetails(requests);
        return requests;
    }

    @Override
    public List<ViewingRequestEntity> getRequestsByAgent(Long agentId) {
        List<ViewingRequestEntity> requests = repository.findByAgentId(agentId);
        populateDetails(requests);
        return requests;
    }

    private void populateDetails(List<ViewingRequestEntity> requests) {
        for (ViewingRequestEntity req : requests) {
            if (req.getCustomerName() == null || req.getCustomerName().isEmpty()) {
                userRepository.findById(req.getCustomerId()).ifPresent(user -> {
                    req.setCustomerName(user.getFullName());
                });
            }
            if (req.getPropertyTitle() == null || req.getPropertyTitle().isEmpty()) {
                propertyRepository.findById(req.getPropertyId()).ifPresent(property -> {
                    req.setPropertyTitle(property.getTitle());
                });
            }
        }
    }

}