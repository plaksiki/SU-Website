package com.example.demo.polls.repository;
import com.example.demo.polls.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionsRepository extends JpaRepository<Questions, Long> {

    List<Questions> findByQuestionnaireId(Long questionnaireId);

}