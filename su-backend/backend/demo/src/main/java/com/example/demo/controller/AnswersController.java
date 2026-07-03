package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Answers;
import com.example.demo.repository.AnswersRepository;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class AnswersController {
    private final AnswersRepository repository;

    public AnswersController (AnswersRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/answers/{id}")
    public Optional<Answers> getOptions(@PathVariable Long id) {
        return repository.findById(id);
    }

}