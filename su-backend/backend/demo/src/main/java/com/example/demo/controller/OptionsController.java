package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Options;
import com.example.demo.repository.OptionsRepository;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class OptionsController {
    private final OptionsRepository repository;

    public OptionsController (OptionsRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/options/{id}")
    public Optional<Options> getMethodName(@PathVariable Long id) {
        return repository.findById(id);
    }

}