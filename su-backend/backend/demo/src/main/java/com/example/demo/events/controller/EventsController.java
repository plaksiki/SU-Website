package com.example.demo.events.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.events.repository.EventsRepository;
import com.example.demo.events.entity.Events;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("event/{id}")
    public Events editEvent(@PathVariable Long id, @RequestBody Events entity) {
        Optional<Events> optional = repository.findById(id);
        if (optional.isPresent()) {
            Events event = optional.get();
            event.setCreatedAt(entity.getCreatedAt());
            event.setDescription(entity.getDescription());
            event.setEventLocation(entity.getEventLocation());
            event.setEventTime(entity.getEventTime());
            event.setFinishedAt(entity.getFinishedAt());
            event.setGalleryUrl(entity.getGalleryUrl());
            event.setPhotoUrls(entity.getPhotoUrls());
            event.setTitle(entity.getTitle());
            return repository.save(event);
        }
        return null;
    }
}