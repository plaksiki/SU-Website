package com.example.demo.polls.repository;
import com.example.demo.polls.entity.Responses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsesRepository
        extends JpaRepository<Responses, Long> {
}