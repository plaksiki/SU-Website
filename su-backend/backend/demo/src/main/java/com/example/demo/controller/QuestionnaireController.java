package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Questionnaire;
import com.example.demo.repository.QuestionnaireRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class QuestionnaireController {

    private final QuestionnaireRepository repository;

    public QuestionnaireController(QuestionnaireRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/questionnaire/{id}")
    public Optional<Questionnaire> getQuestionnaire(@PathVariable Long id) {
        return repository.findById(id);
    }

    @GetMapping("/questionnaires")
    public List<Questionnaire> getAllQuestionnaires() {
        return repository.findAll();
    }

    @PostMapping("/questionnaire")
    public Questionnaire createQuestionnaire(@RequestBody Questionnaire entity) {
        return repository.save(entity);
    }
}