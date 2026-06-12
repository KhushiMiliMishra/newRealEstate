package com.example.demo.repository;

import com.example.demo.entity.AgentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentProfileRepository
        extends JpaRepository<AgentProfile, Long> {
}