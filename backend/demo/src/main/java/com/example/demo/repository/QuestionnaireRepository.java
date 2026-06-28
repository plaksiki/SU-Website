package com.example.demo.repository;

import com.example.demo.entity.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionnaireRepository
        extends JpaRepository<Questionnaire, Long> {

}