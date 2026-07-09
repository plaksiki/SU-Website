package com.example.demo.entity;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "responses")
public class Responses {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(name = "questionnaire_id")
    private Long questionnaireId;
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    public Responses () {
    }

    public Responses (Long id, Long questionnaireId, LocalDateTime submittedAt) {
        this.id = id;
        this.questionnaireId = questionnaireId;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionnaireId() {
        return this.questionnaireId;
    }

    public void setQuestionnaireId(Long questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public LocalDateTime getSubmittedAt() {
        return this.submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}
