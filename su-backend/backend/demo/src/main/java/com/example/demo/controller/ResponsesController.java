package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Responses;
import com.example.demo.repository.ResponsesRepository;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class ResponsesController {
    private final ResponsesRepository repository;

    public ResponsesController (ResponsesRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/responses/{id}")
    public Optional<Responses> getMethodName(@PathVariable Long id) {
        return repository.findById(id);
    }

}
