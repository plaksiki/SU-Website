package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Admins;
import com.example.demo.repository.AdminsRepository;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AdminsController {
    private final AdminsRepository repository;

    public AdminsController (AdminsRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/admins/{id}")
    public Optional<Admins> getOptions(@PathVariable Long id) {
        return repository.findById(id);
    }
    @PostMapping("/admins")
    public Admins createAdmin(@RequestBody Admins entity) {
        return repository.save(entity);
    }
}