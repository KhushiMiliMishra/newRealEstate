package com.example.demo.service;

import com.example.demo.dto.ViewingRequest;
import com.example.demo.entity.Viewing;

import java.util.List;

public interface ViewingService {

    Viewing createViewing(ViewingRequest request);

    List<Viewing> getAllViewings();
}