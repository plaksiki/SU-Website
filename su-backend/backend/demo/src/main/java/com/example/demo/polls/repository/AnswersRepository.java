package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Answers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnswersRepository extends JpaRepository<Answers, Long> {

    List<Answers> findAll();

}