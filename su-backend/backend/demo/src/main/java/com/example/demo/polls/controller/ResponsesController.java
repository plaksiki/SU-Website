package com.example.demo.polls.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.polls.entity.Responses;
import com.example.demo.polls.repository.ResponsesRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ResponsesController {
    private final ResponsesRepository repository;

    public ResponsesController (ResponsesRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/responses/{id}")
    public Optional<Responses> getResponses(@PathVariable Long id) {
        return repository.findById(id);
    }
    @PostMapping("/responses")
    public Responses createResponse(@RequestBody Responses entity) {
        entity.setSubmittedAt(LocalDateTime.now());
        return repository.save(entity);
    }
    @GetMapping("/responses")
    public List<Responses> getAllResponses() {
        return repository.findAll();
    }
}
