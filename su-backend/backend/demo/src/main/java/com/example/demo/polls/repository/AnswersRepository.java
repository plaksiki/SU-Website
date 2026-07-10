package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Answers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswersRepository
        extends JpaRepository<Answers, Long> {
}
