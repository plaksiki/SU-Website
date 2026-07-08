package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Options;
import com.example.demo.repository.OptionsRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class OptionsController {
    private final OptionsRepository repository;

    public OptionsController (OptionsRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/options/{id}")
    public Optional<Options> getOptions(@PathVariable Long id) {
        return repository.findById(id);
    }
    @GetMapping("/options/by-question/{questionId}")
    public List<Options> getOptionsByQuestion(@PathVariable Long questionId) {
        return repository.findByQuestionId(questionId);
    }
    @PostMapping("/options")
    public Options createOption(@RequestBody Options entity) {
        return repository.save(entity);
    }
}