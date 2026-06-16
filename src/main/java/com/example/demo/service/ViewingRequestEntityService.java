package com.example.demo.service;

import com.example.demo.dto.ViewingRequestDto;
import com.example.demo.entity.ViewingRequestEntity;

import java.util.List;

public interface ViewingRequestEntityService {

    ViewingRequestEntity createRequest(
            ViewingRequestDto request);

    List<ViewingRequestEntity> getAllRequests();

    ViewingRequestEntity approveRequest(Long id);

    ViewingRequestEntity rejectRequest(Long id);
}