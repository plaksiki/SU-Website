package com.example.demo.polls.controller;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.polls.entity.Questionnaire;
import com.example.demo.polls.entity.Questions;
import com.example.demo.polls.repository.QuestionsRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    @PutMapping("question/{id}")
    public Questions editQuestion(@PathVariable Long id, @RequestBody Questions entity) {
        Optional<Questions> optional = repository.findById(id);
        if (optional.isPresent()) {
            Questions question = optional.get();
            question.setQuestionnaireId(entity.getQuestionnaireId());
            question.setOrderIndex(entity.getOrderIndex());
            question.setQuestionType(entity.getQuestionType());
            question.setText(entity.getText());
            return repository.save(question);
        }
        return null;
    }
}
