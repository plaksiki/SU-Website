package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Responses;
import com.example.demo.repository.ResponsesRepository;
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
        return repository.save(entity);
    }
}
