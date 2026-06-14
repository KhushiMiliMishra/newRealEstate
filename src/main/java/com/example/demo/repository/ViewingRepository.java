package com.example.demo.repository;

import com.example.demo.entity.Viewing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewingRepository
        extends JpaRepository<Viewing, Long> {
}