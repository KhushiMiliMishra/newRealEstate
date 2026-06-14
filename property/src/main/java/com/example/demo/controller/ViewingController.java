package com.example.demo.controller;

import com.example.demo.dto.ViewingRequest;
import com.example.demo.entity.Viewing;
import com.example.demo.service.ViewingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viewings")
@CrossOrigin("*")
public class ViewingController {

    private final ViewingService viewingService;

    public ViewingController(ViewingService viewingService) {
        this.viewingService = viewingService;
    }

    @PostMapping
    public Viewing createViewing(
            @RequestBody ViewingRequest request) {

        return viewingService.createViewing(request);
    }

    @GetMapping
    public List<Viewing> getAllViewings() {
        return viewingService.getAllViewings();
    }
}