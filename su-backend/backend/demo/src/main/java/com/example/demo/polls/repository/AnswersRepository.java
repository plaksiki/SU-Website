package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Answers;
import com.example.demo.polls.model.AnswerExportModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AnswersRepository extends JpaRepository<Answers, Long> {
        @Query("""
        SELECT new com.example.demo.polls.model.AnswerExportModel(
        a.responseId,
        q.text,
        COALESCE(o.text, a.text_answer)
        )
        FROM Answers a
        JOIN Questions q
        ON a.questionId = q.id
        LEFT JOIN Options o
        ON a.optionId = o.id
        WHERE q.questionnaireId = :questionnaireId
        """)
        List<AnswerExportModel> exportAnswers(
                @Param("questionnaireId") Long questionnaireId
        );
}