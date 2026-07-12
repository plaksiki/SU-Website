package com.example.demo.events.repository;

import com.example.demo.events.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository
        extends JpaRepository<Events, Long> {
}