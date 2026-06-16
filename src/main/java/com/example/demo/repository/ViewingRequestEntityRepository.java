package com.example.demo.repository;

import com.example.demo.entity.ViewingRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewingRequestEntityRepository
        extends JpaRepository<ViewingRequestEntity, Long> {
}