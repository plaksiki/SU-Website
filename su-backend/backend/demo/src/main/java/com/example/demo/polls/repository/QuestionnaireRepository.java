package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionnaireRepository
        extends JpaRepository<Questionnaire, Long> {
}