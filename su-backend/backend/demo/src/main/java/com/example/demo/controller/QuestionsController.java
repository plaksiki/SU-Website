package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Questions;
import com.example.demo.repository.QuestionsRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
    @GetMapping("/question/by-questionnaire/{questionnaireId}")
    public List<Questions> getQuestionsByQuestionnaire( @PathVariable Long questionnaireId) {
        return repository.findByQuestionnaireId(questionnaireId);
    }
    @PostMapping("/questions")
    public Questions createQuestion(@RequestBody Questions entity) {
        return repository.save(entity);
    }
}
