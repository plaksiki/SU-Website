package com.example.demo.polls.repository;
import com.example.demo.polls.entity.Options;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OptionsRepository extends JpaRepository<Options, Long> {

    List<Options> findByQuestionId(Long questionId);

}
