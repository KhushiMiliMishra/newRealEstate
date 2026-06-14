package com.example.demo.service;

import com.example.demo.dto.ViewingRequest;
import com.example.demo.entity.Viewing;
import com.example.demo.repository.ViewingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewingServiceImpl implements ViewingService {

    private final ViewingRepository viewingRepository;

    public ViewingServiceImpl(ViewingRepository viewingRepository) {
        this.viewingRepository = viewingRepository;
    }

    @Override
    public Viewing createViewing(ViewingRequest request) {

        Viewing viewing = new Viewing();

        viewing.setPropertyId(request.getPropertyId());
        viewing.setPropertyTitle(request.getPropertyTitle());
        viewing.setPropertyLocation(request.getPropertyLocation());
        viewing.setPropertyPrice(request.getPropertyPrice());

        viewing.setDate(request.getDate());
        viewing.setTime(request.getTime());

        viewing.setNotes(request.getNotes());

        viewing.setAgentName(request.getAgentName());

        viewing.setStatus("PENDING");

        return viewingRepository.save(viewing);
    }

    @Override
    public List<Viewing> getAllViewings() {
        return viewingRepository.findAll();
    }
}
