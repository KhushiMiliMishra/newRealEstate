package com.example.demo.service;

import com.example.demo.dto.ViewingRequestDto;
import com.example.demo.entity.ViewingRequestEntity;
import com.example.demo.repository.ViewingRequestEntityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewingRequestEntityServiceImpl
        implements ViewingRequestEntityService {

    private final ViewingRequestEntityRepository repository;

    public ViewingRequestEntityServiceImpl(
            ViewingRequestEntityRepository repository) {

        this.repository = repository;
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

        entity.setAgentId(
                request.getAgentId());

        entity.setRequestedDate(
                request.getRequestedDate());

        entity.setRequestedTime(
                request.getRequestedTime());

        entity.setNotes(
                request.getNotes());

        entity.setStatus("PENDING");

        return repository.save(entity);
    }

    @Override
    public List<ViewingRequestEntity> getAllRequests() {
        return repository.findAll();
    }

    @Override
    public ViewingRequestEntity approveRequest(
            Long id) {

        ViewingRequestEntity request =
                repository.findById(id)
                .orElseThrow();

        request.setStatus("APPROVED");

        return repository.save(request);
    }

    @Override
    public ViewingRequestEntity rejectRequest(
            Long id) {

        ViewingRequestEntity request =
                repository.findById(id)
                .orElseThrow();

        request.setStatus("REJECTED");

        return repository.save(request);
    }
    @Override
public List<ViewingRequestEntity>
getCustomerRequests(Long customerId) {

    return repository.findByCustomerId(
            customerId);
}
}