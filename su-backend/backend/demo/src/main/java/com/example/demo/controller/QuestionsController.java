package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Questions;
import com.example.demo.repository.QuestionsRepository;

import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class QuestionsController {
    private final QuestionsRepository repository;

    public QuestionsController (QuestionsRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/questions/{id}")
    public Optional<Questions> getResponses(@PathVariable Long id) {
        return repository.findById(id);
    }
}
