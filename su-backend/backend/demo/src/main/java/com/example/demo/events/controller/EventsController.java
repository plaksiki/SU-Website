package com.example.demo.events.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.events.repository.EventsRepository;
import com.example.demo.events.entity.Events;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class EventsController {

    private final EventsRepository repository;

    public EventsController(EventsRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/events")
    public List<Events> getAllEvents() {
        return repository.findAll();
    }

    @PostMapping("/event")
    public Events createEvent(@RequestBody Events entity) {
        return repository.save(entity);
    }

    @DeleteMapping("/event/{id}")
    public void deleteEvent(@PathVariable Long id) {
        repository.deleteById(id);
    }
}