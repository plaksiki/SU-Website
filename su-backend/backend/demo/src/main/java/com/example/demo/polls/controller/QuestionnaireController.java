package com.example.demo.polls.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.demo.polls.entity.Questionnaire;
import com.example.demo.polls.repository.QuestionnaireRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


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

    @DeleteMapping("/questionnaire/{id}")
    public void deleteQuestionnaire(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("questionnaire/{id}")
    public Questionnaire editQuestionnaire(@PathVariable Long id, @RequestBody Questionnaire entity) {
        Optional<Questionnaire> optional = repository.findById(id);
        if (optional.isPresent()) {
            Questionnaire questionnaire = optional.get();
            questionnaire.setTitle(entity.getTitle());
            questionnaire.setDescription(entity.getDescription());
            questionnaire.setStartedAt(entity.getStartedAt());
            questionnaire.setFinishedAt(entity.getFinishedAt());
            return repository.save(questionnaire);
        }
        return null;
    }
}