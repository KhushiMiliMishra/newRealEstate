package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.ViewingRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewingRequestEntityRepository
        extends JpaRepository<ViewingRequestEntity, Long> {

    List<ViewingRequestEntity> findByCustomerId(
            Long customerId);

    List<ViewingRequestEntity> findByAgentId(
            Long agentId);
}