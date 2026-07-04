package com.example.demo.repository;
import com.example.demo.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository
        extends JpaRepository<Questions, Long> {
}
