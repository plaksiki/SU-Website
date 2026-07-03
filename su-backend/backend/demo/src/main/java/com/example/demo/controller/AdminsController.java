package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Admins;
import com.example.demo.repository.AdminsRepository;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class AdminsController {
    private final AdminsRepository repository;

    public AdminsController (AdminsRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/options/{id}")
    public Optional<Admins> getOptions(@PathVariable Long id) {
        return repository.findById(id);
    }

}