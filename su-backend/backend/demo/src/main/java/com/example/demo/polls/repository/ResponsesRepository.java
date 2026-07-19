package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Responses;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsesRepository
        extends JpaRepository<Responses, Long> {
        List<Responses> findByQuestionnaireId(Long questionnaireId);
}