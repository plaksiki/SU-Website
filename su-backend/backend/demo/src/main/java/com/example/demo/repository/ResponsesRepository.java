package com.example.demo.repository;
import com.example.demo.entity.Responses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsesRepository
        extends JpaRepository<Responses, Long> {
}